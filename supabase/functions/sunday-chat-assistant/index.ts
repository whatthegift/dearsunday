import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

// Replace this with your actual Custom GPT Assistant ID
const ASSISTANT_ID = "asst_your_assistant_id_here";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, recipientDetails } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Create a thread for the conversation
    const threadResponse = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2"
      },
      body: JSON.stringify({})
    });

    if (!threadResponse.ok) {
      throw new Error(`Failed to create thread: ${threadResponse.status}`);
    }

    const thread = await threadResponse.json();

    // Add context if available
    let fullMessage = message;
    if (recipientDetails) {
      const contextInfo = `Context about gift recipient:
Name: ${recipientDetails.name || "Unknown"}
Relationship: ${recipientDetails.relationship || "Not specified"}
Interests: ${recipientDetails.interests?.join(", ") || "Not specified"}
Occasion: ${recipientDetails.occasion || "Not specified"}
Budget: ${recipientDetails.budget || "Not specified"}

User message: ${message}`;
      fullMessage = contextInfo;
    }

    // Add the user message to the thread
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2"
      },
      body: JSON.stringify({
        role: "user",
        content: fullMessage
      })
    });

    if (!messageResponse.ok) {
      throw new Error(`Failed to add message: ${messageResponse.status}`);
    }

    // Run the assistant
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2"
      },
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID
      })
    });

    if (!runResponse.ok) {
      throw new Error(`Failed to run assistant: ${runResponse.status}`);
    }

    const run = await runResponse.json();

    // Poll for completion (with timeout)
    let runStatus = run;
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout

    while ((runStatus.status === 'running' || runStatus.status === 'queued') && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
      
      const statusResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs/${runStatus.id}`, {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2"
        }
      });
      
      if (statusResponse.ok) {
        runStatus = await statusResponse.json();
      } else {
        throw new Error(`Failed to get run status: ${statusResponse.status}`);
      }
    }

    if (runStatus.status !== 'completed') {
      throw new Error(`Assistant run failed with status: ${runStatus.status}`);
    }

    // Get the messages
    const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2"
      }
    });

    if (!messagesResponse.ok) {
      throw new Error(`Failed to get messages: ${messagesResponse.status}`);
    }

    const messages = await messagesResponse.json();
    const assistantMessage = messages.data.find(msg => msg.role === 'assistant');
    const botReply = assistantMessage?.content[0]?.text?.value || "I'm sorry, I couldn't generate a response.";

    // Determine if this is a gift suggestion message
    const isGiftSuggestion = botReply.includes("GIFT IDEAS:") || 
                            message.toLowerCase().includes("gift") || 
                            message.toLowerCase().includes("present") ||
                            message.toLowerCase().includes("recommend");

    return new Response(
      JSON.stringify({
        text: botReply,
        type: isGiftSuggestion ? "suggestion" : "information",
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while processing your request",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});