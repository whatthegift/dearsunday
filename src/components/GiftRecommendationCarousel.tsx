
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { GiftRecommendationCard } from "./GiftRecommendationCard";

interface GiftRecommendation {
  id: string;
  title: string;
  price: string;
  image?: string;
}

interface GiftRecommendationCarouselProps {
  recommendations: GiftRecommendation[];
}

export function GiftRecommendationCarousel({ recommendations }: GiftRecommendationCarouselProps) {
  if (!recommendations.length) return null;
  
  return (
    <div className="my-4 pl-12">
      <Carousel 
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendations.map((gift) => (
            <CarouselItem key={gift.id} className="basis-auto pl-4 md:basis-1/2 lg:basis-1/3">
              <GiftRecommendationCard
                title={gift.title}
                price={gift.price}
                image={gift.image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-8 w-8 -left-3" />
        <CarouselNext className="h-8 w-8 -right-3" />
      </Carousel>
    </div>
  );
}
