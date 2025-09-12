import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import "@fontsource/cookie";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthForm } from "@/components/auth/AuthForm";
export default function HomePage() {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  if (user) return null;
  return <div className="min-h-screen bg-[#f8f3f3] text-[#444444] font-poppins">
      <section className="px-4 mx-0 my-0 py-[90px] md:px-[48px] bg-[#e2cfcf]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center items-center h-full">
            <img src="/lovable-uploads/ff7193b6-a935-4631-aeac-a12326ccef4b.png" alt="GiftYourThought Logo" className="w-auto h-full max-w-[400px] md:max-w-[250px] object-cover" />
          </div>
          
          <div className="bg-[#f3e5e5] p-8 md:p-12 flex flex-col items-center py-[59px] px-[70px] mx-[16px] my-0">
            <h1 className="mb-6 text-center font-bold text-[#222222] leading-tight text-2xl">Gift a thought. Not just a thing.</h1>
            <p className="mb-6 text-center font-normal text-[16px] leading-[1.6]">We just wrap it in ribbons and send it with a smile.
#GiftYourThought begins here.</p>
            <Button onClick={() => setIsAuthDialogOpen(true)} className="bg-[#f4c531] hover:bg-[#f4c531]/90 text-[#333333] uppercase px-8 py-3 rounded-md tracking-[0.5px] transition-all text-xs font-semibold">Start Gifting</Button>
          </div>
        </div>
      </section>

      <section className="bg-white text-[#444444] my-0 py-[36px]">
        <div className="max-w-6xl mx-auto px-6 md:px-[16px] my-0 py-0">
          <h2 className="mb-6 text-center text-[#222222] text-xl font-semibold">💛 Meet Your Personal Gifting Assistant</h2>
          <p className="text-[16px] mb-12 text-center leading-[1.6] font-normal max-w-4xl mx-auto">At GiftYourThought, we believe a great gift doesn't start with a product — it starts with a person. Their smile, their quirks, their 'oh-my-god-how-did-you-know?' moments.</p>
          
          <h3 className="mb-8 text-center text-[#333333] font-semibold text-base">What Happens When You Create an Account?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">👥</span>
                <h4 className="font-semibold text-[#333333] text-base">People, Not Just Dates</h4>
              </div>
              <p className="text-[#444444] leading-[1.6] font-normal text-base">Add your favorite people — their personalities, little joys, and big moments. Sunday stores it all so you never forget what makes them them.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📅</span>
                <h4 className="font-semibold text-[#333333] text-base">Your Personal Gifting Calendar</h4>
              </div>
              <p className="text-[#444444] leading-[1.6] font-normal text-base">Never miss a birthday, anniversary, or milestone again. Sunday remembers every important date — and gives you a gentle nudge, just in time.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🎁</span>
                <h4 className="font-semibold text-[#333333] text-base">Gift Ideas That Actually Get it Right</h4>
              </div>
              <p className="text-[#444444] leading-[1.6] font-normal text-base">No random lists here. Sunday understands who you’re gifting for and what they’d love — so every suggestion feels just right.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">👋</span>
                <h4 className="font-semibold text-[#333333] text-base">A Shelf for Your Gifting Brain</h4>
              </div>
              <p className="text-[#444444] leading-[1.6] font-normal text-base">Save gifts you’re eyeing, explore new ideas, and revisit past picks — all in one place. Think of it as your thoughtful little gift shop, curated by you and Sunday.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            
            <p className="mb-6 text-[#444444] leading-[1.6] text-base font-light text-center">✨ All the thoughtfulness. None of the overwhelm.

Create your free account, and let Sunday take it from here.</p>
            <Button onClick={() => setIsAuthDialogOpen(true)} className="bg-[#f4c531] hover:bg-[#f4c531]/90 uppercase px-8 py-3 rounded-md tracking-[0.5px] transition-all text-[#333333] text-xs font-semibold">Start Gifting</Button>
          </div>
        </div>
      </section>

      <section className="bg-[#f3e5e5] px-4 py-[36px]">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-8 text-[#222222] text-xl font-semibold">🌍 So, Who's Behind All This?</h2>
          
          <p className="mb-4 leading-[1.6] text-base font-thin">You landed on <span className="font-semibold">giftyourthought.com</span>, where the joy of gifting begins with something deeper than just shopping — it begins with thought.</p>
          
          <p className="mb-4 leading-[1.6] text-base font-thin text-left">We started this to bring back the magic of gifting — not as a transaction, but as a gesture. The kind where two people smile at the same time, and you just know you got it right.</p>
          
          <p className="mb-4 leading-[1.6] text-base font-thin text-left">We're the ones behind the curtain, curating finds that make you whisper, <span className="font-semibold">"What the gift?"</span> From the outrageously unique to the quietly perfect, everything we recommend is rooted in the people you're buying for — not in product trends.</p>
          
          <p className="mb-4 leading-[1.6] text-base font-thin text-left">Have a question? Need some inspiration? Or just want to share the joy of finding that perfect gift? <span className="font-semibold">Drop me a line! I'm here to make sure every gift you give feels like the perfect thought, wrapped up in a bow.</span></p>
          
          <p className="mb-4 leading-[1.6] text-base font-thin text-center">Let's make gifting as thoughtful and special as it deserves to be.<br />Cheers, confetti, and all that jazz!</p>
        </div>
      </section>

      <section className="px-4 bg-[#f8f3f3] py-[36px]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-8 text-[#222222] font-semibold text-xl">🪄 Have Someone in Mind?</h2>
            
            <p className="mb-6 text-[16px] leading-[1.6] font-normal text-justify">Whether it's the book lover who gets lost in every page, the photographer who sees magic through a lens, or your forever friend who deserves the world — tell us a little about them, and we'll help you find a gift that speaks.</p>
            
            <p className="mb-4 font-normal text-[16px] leading-[1.6]">Drop a note or a thought to:<br />📬 whatthegift@giftyourthought.com<br />Let's turn your "I want to get them something" into "I nailed it."</p>
          </div>
          
          <div className="flex justify-center width: 28rem mx-0">
            <img alt="GiftYourThought Logo" src="/lovable-uploads/fcb50590-2d8d-4879-aa6f-7f02d48c9d4c.png" className="w-64 object-contain" />
          </div>
        </div>
      </section>

      <footer className="py-6 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-[14px] text-gray-500 font-normal">
          <p>COPYRIGHT © 2024 #GIFTYOURTHOUGHT - ALL RIGHTS RESERVED.</p>
          <p>POWERED BY <span className="font-semibold">GIFTYOURTHOUGHT</span></p>
        </div>
      </footer>

      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <div className="p-6">
            <h2 className="font-semibold mb-4 text-center text-[22px] text-[#333333]">Welcome to GiftYourThought</h2>
            <p className="text-center text-[#666666] mb-6 text-[14px] font-normal">
              Sign in to manage your relationships and never forget an important occasion again.
            </p>
            <AuthForm onSuccess={() => {
            setIsAuthDialogOpen(false);
            navigate('/dashboard');
          }} />
          </div>
        </DialogContent>
      </Dialog>
    </div>;
}