import { ChatInterface } from "@/components/chat/ChatInterface";

const Index = () => {
  return (
    <div className="h-screen bg-gradient-bg">
      <div className="container mx-auto max-w-4xl h-full flex flex-col">
        <div className="flex-1 bg-card/20 backdrop-blur-sm border border-border rounded-lg m-4 overflow-hidden shadow-2xl">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Index;