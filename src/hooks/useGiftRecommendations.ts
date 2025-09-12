
export interface GiftRecommendation {
  id: string;
  title: string;
  price: string;
  image?: string;
}

export function useGiftRecommendations() {
  // Sample gift recommendations
  const giftRecommendations: GiftRecommendation[] = [{
    id: "1",
    title: "Personalized Photo Frame",
    price: "$25.99",
    image: "/placeholder.svg"
  }, {
    id: "2",
    title: "Handcrafted Leather Wallet",
    price: "$49.99",
    image: "/placeholder.svg"
  }, {
    id: "3",
    title: "Espresso Machine",
    price: "$129.99",
    image: "/placeholder.svg"
  }, {
    id: "4",
    title: "Custom Star Map",
    price: "$39.99",
    image: "/placeholder.svg"
  }];

  return { giftRecommendations };
}
