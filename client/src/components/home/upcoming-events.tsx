import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@shared/schema";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const EventCard = ({ event }: { event: Event }) => {
  const formattedDate = format(new Date(event.date), "dd MMM yyyy", { locale: id });

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white rounded-xl">
      <div className="relative h-48">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-[#FF7A45] text-white text-sm font-poppins font-semibold px-3 py-1 rounded-full">
          {formattedDate}
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-poppins font-semibold text-xl mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="mr-2 text-[#4A90E2] h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Clock className="mr-2 text-[#4A90E2] h-4 w-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-poppins font-semibold text-[#FF7A45]">{event.fee}</span>
          <Button className="font-poppins font-semibold text-sm bg-[#2E8B57] text-white px-4 py-2 rounded-full hover:bg-[#25704d] transition-colors h-9">
            Daftar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const UpcomingEvents = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['/api/events'],
  });

  // Take only the first 3 events
  const upcomingEvents = events?.slice(0, 3) || [];

  return (
    <section className="py-12 bg-[#F5F7FA]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#333333]">Event Mendatang</h2>
          <Link href="/events">
            <a className="font-poppins font-semibold text-[#4A90E2] hover:text-[#3a77c2] transition-colors inline-flex items-center">
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-md bg-white rounded-xl">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-5">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
                  <div className="flex items-center mb-3">
                    <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    <div className="h-9 bg-gray-200 rounded-full animate-pulse w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
