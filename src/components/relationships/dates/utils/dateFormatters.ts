
import { format, differenceInDays } from "date-fns";

export const formatAnniversaryDate = (month: number, day: number, year?: number, includeYear?: boolean) => {
  const currentYear = new Date().getFullYear();
  const dateObj = new Date(year || currentYear, month - 1, day);
  
  if (includeYear && year) {
    return format(dateObj, "MMMM d, yyyy");
  }
  return format(dateObj, "MMMM d");
};

export const getDaysUntil = (month: number, day: number): string => {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  let nextDate = new Date(currentYear, month - 1, day);
  
  if (nextDate < today) {
    nextDate = new Date(currentYear + 1, month - 1, day);
  }
  
  const diffDays = differenceInDays(nextDate, today);
  
  if (diffDays === 0) return "Today!";
  if (diffDays === 1) return "Tomorrow!";
  return `In ${diffDays} days`;
};

export const getYearsText = (startYear: number | undefined): string => {
  if (!startYear) return "";
  
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  
  if (years === 0) return "This year";
  if (years === 1) return "1 year";
  return `${years} years`;
};
