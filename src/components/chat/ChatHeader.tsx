
import SundayAvatar from "@/components/SundayAvatar";

export function ChatHeader() {
  return (
    <div className="flex items-center gap-3">
      <SundayAvatar size="lg" animated />
      <div>
        <h1 className="tracking-tight text-base font-semibold">🗨️ Dear Sunday</h1>
        <p className="text-muted-foreground mt-1 text-sm font-thin">Because thoughtful ideas often begin with a little talk.</p>
      </div>
    </div>
  );
}
