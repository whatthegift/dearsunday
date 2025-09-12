
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import RelationshipsPage from "@/pages/RelationshipsPage";
import ChatPage from "@/pages/ChatPage";
import PersonProfilePage from "@/pages/PersonProfilePage";
import GiftHistoryPage from "@/pages/GiftHistoryPage";
import GiftIdeasPage from "@/pages/GiftIdeasPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";
import DatesPage from "@/pages/DatesPage";
import WishlistsPage from "@/pages/WishlistsPage";
import StyleGuide from "@/components/StyleGuide";
import HomePage from "@/pages/HomePage";
import GiftFormPage from "@/pages/GiftFormPage";
import StudioPage from "@/pages/StudioPage";
import { Toaster } from "@/components/ui/sonner";

import AppLayout from "@/components/AppLayout";
import { ProtectedRoutes } from "@/components/auth/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<AppLayout><Outlet /></AppLayout>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/relationships" element={<RelationshipsPage />} />
            <Route path="/person/:id" element={<PersonProfilePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/gifts" element={<GiftHistoryPage />} />
            <Route path="/gift-history" element={<GiftHistoryPage />} />  {/* Added this route to match the sidebar link */}
            <Route path="/gifts/add" element={<GiftFormPage />} />
            <Route path="/gift-ideas" element={<GiftIdeasPage />} />
            <Route path="/dates" element={<DatesPage />} />
            <Route path="/wishlists" element={<WishlistsPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/style-guide" element={<StyleGuide />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
