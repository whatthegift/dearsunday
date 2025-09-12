
import React from "react";
import UpcomingDates from "@/components/UpcomingDates";
import QuickStats from "@/components/QuickStats";
import SundayChat from "@/components/SundayChat";
import About from "@/components/dashboard/About";
import MeetSunday from "@/components/dashboard/MeetSunday";

const Dashboard = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animated-entry">
      <QuickStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <UpcomingDates />
        <SundayChat />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <About />
        <MeetSunday />
      </div>
    </div>
  );
};

export default Dashboard;
