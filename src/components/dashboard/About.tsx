
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-sm sm:text-lg font-medium gap-2">
          <Info className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">About GiftYourThought</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm font-thin leading-relaxed">
          GiftYourThought is more than gifting—it's pausing, thinking, and choosing with your heart. We help you find gifts that actually mean something.  

Whether it's a birthday, a milestone, or just a random Tuesday, GiftYourThought nudges you toward intentionality.

No big marketplaces, no overwhelming lists—just quiet, thoughtful curation that makes someone feel seen. It's for the ones you love. And the ones you don't want to forget to love.</p>
      </CardContent>
    </Card>
  );
}
