
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MeetSunday() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-sm sm:text-lg font-medium gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Meet Sunday</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm font-thin leading-relaxed">
          Sunday is your warm, chatty, slightly magical gifting assistant.
She remembers the dates you forget. She listens when you describe someone. She connects dots you didn't know were connected—and she recommends gifts that fit just right.
Sunday isn't just smart—she's emotionally tuned in. She makes gifting simple, soulful, and just a little more special.
If you've ever said "I don't know what to get them," Sunday's your person. (Well, your box.)</p>
      </CardContent>
    </Card>
  );
}
