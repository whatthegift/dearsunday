
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useGiftRecommendations } from "@/hooks/useGiftRecommendations";
import { useRelationships } from "@/hooks/use-relationships";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import AddPersonDialog from "@/components/relationships/AddPersonDialog";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GiftingProfile } from "@/components/chat/GiftingProfile";

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const personId = searchParams.get("personId");
  const navigate = useNavigate();
  const { relationships, getRelationshipAnniversaries } = useRelationships();
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(personId);
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false);
  const [isProfilePanelCollapsed, setIsProfilePanelCollapsed] = useState(false);
  
  const { 
    messages, 
    isTyping, 
    showGiftRecommendations, 
    handleSendMessage,
    loadPersonChat 
  } = useChatMessages();
  
  const { giftRecommendations } = useGiftRecommendations();
  
  // Find the selected person in the relationships list
  const selectedPerson = relationships.data?.find(person => person.id === selectedPersonId) || null;

  // If relationships are loaded and we have a personId from URL but it's not found in relationships,
  // clear the selection
  useEffect(() => {
    if (relationships.data && personId && !relationships.data.find(p => p.id === personId)) {
      setSelectedPersonId(null);
    }
  }, [relationships.data, personId]);

  // When selectedPersonId changes, load that person's chat
  useEffect(() => {
    if (selectedPersonId) {
      loadPersonChat(selectedPersonId);
      
      // Update URL if needed
      if (personId !== selectedPersonId) {
        navigate(`/chat?personId=${selectedPersonId}`, { replace: true });
      }
    }
  }, [selectedPersonId, loadPersonChat, navigate, personId]);

  const handleSelectPerson = (id: string) => {
    setSelectedPersonId(id);
  };

  const handleAddPerson = () => {
    setIsAddPersonDialogOpen(true);
  };

  const handlePersonAdded = (newPersonId: string) => {
    // Close the dialog and select the new person
    setIsAddPersonDialogOpen(false);
    setSelectedPersonId(newPersonId);
  };

  const toggleProfilePanel = () => {
    setIsProfilePanelCollapsed(!isProfilePanelCollapsed);
  };

  return (
    <div className="space-y-4 animated-entry flex flex-col h-[calc(100vh-160px)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <ChatHeader />
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* Left Panel: People List */}
        <ChatSidebar 
          relationships={relationships.data || []} 
          isLoading={relationships.isLoading}
          selectedPersonId={selectedPersonId}
          onSelectPerson={handleSelectPerson}
          onAddPerson={handleAddPerson}
        />
        
        {/* Middle Panel: Chat */}
        {selectedPerson ? (
          <div className={`flex-1 flex ${isProfilePanelCollapsed ? 'flex-grow' : ''} transition-all duration-300`}>
            <ChatContainer 
              messages={messages}
              isTyping={isTyping}
              showGiftRecommendations={showGiftRecommendations}
              giftRecommendations={giftRecommendations}
              onSendMessage={handleSendMessage}
              selectedPerson={selectedPerson}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-background rounded-lg border p-8">
            <h3 className="text-lg font-medium mb-4">Choose a person to chat about</h3>
            <p className="text-muted-foreground text-center mb-6">
              Select someone from your list or add a new person to start a gifting conversation with Sunday.
            </p>
            <Button onClick={handleAddPerson} className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Person
            </Button>
          </div>
        )}
        
        {/* Right Panel: Gifting Profile */}
        {selectedPerson && (
          <GiftingProfile 
            person={selectedPerson} 
            isCollapsed={isProfilePanelCollapsed}
            onToggleCollapse={toggleProfilePanel}
          />
        )}
      </div>

      {/* Add Person Dialog */}
      {isAddPersonDialogOpen && (
        <AddPersonDialog 
          open={isAddPersonDialogOpen} 
          onOpenChange={setIsAddPersonDialogOpen}
        />
      )}
    </div>
  );
}
