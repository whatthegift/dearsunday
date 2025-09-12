
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

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

    // Replace this with your custom GPT instructions
    const systemPrompt = `[PASTE YOUR CUSTOM GPT INSTRUCTIONS HERE]
    
Example:
You are [Your Custom GPT Name], [your custom personality and role].

[Your specific instructions about how to respond, what to focus on, etc.]

Be sure to maintain a [your desired tone] tone and [any specific formatting requirements].`;

    // Prepare recipient details context if available
    let contextPrompt = "";
    if (recipientDetails) {
      contextPrompt = `Here are details about the gift recipient:
      Name: ${recipientDetails.name || "Unknown"}
      Relationship: ${recipientDetails.relationship || "Not specified"}
      Interests: ${recipientDetails.interests?.join(", ") || "Not specified"}
      Occasion: ${recipientDetails.occasion || "Not specified"}
      Budget: ${recipientDetails.budget || "Not specified"}
      `;
    }

    // Include previous conversation for context if available
    if (context && Array.isArray(context)) {
      // Format previous messages for the API
      const previousMessages = context.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));

      // Add system, context, and new user message
      const messages = [
        { role: "system", content: systemPrompt },
        { role: "system", content: contextPrompt },
        ...previousMessages,
        { role: "user", content: message }
      ].filter(msg => msg.content); // Remove empty messages
      
      console.log("Sending request to OpenAI API with messages:", JSON.stringify(messages));

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Using the latest model that balances performance and cost
          messages,
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      const responseData = await response.json();
      
      if (responseData.error) {
        console.error("OpenAI API error:", responseData.error);
        throw new Error(`OpenAI API error: ${responseData.error.message}`);
      }

      const botReply = responseData.choices[0].message.content;
      
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
    } else {
      // Handle simple message without context
      const messages = [
        { role: "system", content: systemPrompt },
        { role: "system", content: contextPrompt },
        { role: "user", content: message }
      ].filter(msg => msg.content);

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      const responseData = await response.json();
      
      if (responseData.error) {
        console.error("OpenAI API error:", responseData.error);
        throw new Error(`OpenAI API error: ${responseData.error.message}`);
      }

      const botReply = responseData.choices[0].message.content;
      
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
    }
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
