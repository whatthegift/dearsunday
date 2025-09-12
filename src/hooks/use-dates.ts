
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DateEvent {
  id: string;
  personName: string;
  personId: string;
  date: string;
  eventType: string;
  daysLeft: number;
}

export function useDates() {
  const { user } = useAuth();

  const fetchUpcomingDates = async (): Promise<DateEvent[]> => {
    if (!user) return [];

    // Get relationships and their anniversaries
    const { data: relationships, error: relationshipsError } = await supabase
      .from('relationships')
      .select('id, name');

    if (relationshipsError) {
      throw new Error(relationshipsError.message);
    }

    if (!relationships || relationships.length === 0) {
      return [];
    }

    const relationshipMap = new Map(
      relationships.map(r => [r.id, r.name])
    );

    // Get anniversaries for all relationships
    const { data: anniversaries, error: anniversariesError } = await supabase
      .from('anniversaries')
      .select('*');

    if (anniversariesError) {
      throw new Error(anniversariesError.message);
    }

    if (!anniversaries || anniversaries.length === 0) {
      return [];
    }

    // Get birthdays from relationships
    const { data: relationshipsWithBirthday, error: birthdayError } = await supabase
      .from('relationships')
      .select('id, name, birthday')
      .not('birthday', 'is', null);

    if (birthdayError) {
      throw new Error(birthdayError.message);
    }

    // Calculate days left for each event and format the response
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Process anniversaries
    const anniversaryEvents = anniversaries.map(anniversary => {
      const relationshipName = relationshipMap.get(anniversary.relationship_id) || 'Unknown';
      const anniversaryDate = new Date(anniversary.date);
      const month = anniversaryDate.getMonth() + 1;
      const day = anniversaryDate.getDate();
      
      let eventDate = new Date(currentYear, month - 1, day);
      
      // If the date has already passed this year, use next year
      if (
        month < currentMonth ||
        (month === currentMonth && day < currentDay)
      ) {
        eventDate = new Date(currentYear + 1, month - 1, day);
      }
      
      const daysLeft = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        id: anniversary.id,
        personId: anniversary.relationship_id,
        personName: relationshipName,
        date: `${month}/${day}/${currentYear}`,
        eventType: anniversary.title,
        daysLeft
      };
    });

    // Process birthdays
    const birthdayEvents = relationshipsWithBirthday
      ? relationshipsWithBirthday
          .filter(r => r.birthday)
          .map(relationship => {
            const birthdayDate = new Date(relationship.birthday);
            const month = birthdayDate.getMonth() + 1;
            const day = birthdayDate.getDate();
            
            let eventDate = new Date(currentYear, month - 1, day);
            
            // If the birthday has already passed this year, use next year
            if (
              month < currentMonth ||
              (month === currentMonth && day < currentDay)
            ) {
              eventDate = new Date(currentYear + 1, month - 1, day);
            }
            
            const daysLeft = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            
            return {
              id: `birthday-${relationship.id}`,
              personId: relationship.id,
              personName: relationship.name,
              date: `${month}/${day}/${currentYear}`,
              eventType: 'Birthday',
              daysLeft
            };
          }) 
      : [];

    // Combine all events and sort by days left
    const allEvents = [...anniversaryEvents, ...birthdayEvents]
      .sort((a, b) => a.daysLeft - b.daysLeft);
      
    // Limit to the next 5 upcoming events
    return allEvents.slice(0, 5);
  };

  return useQuery({
    queryKey: ['upcoming-dates'],
    queryFn: fetchUpcomingDates,
    enabled: !!user
  });
}
