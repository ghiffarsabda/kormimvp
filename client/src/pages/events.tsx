import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@shared/schema";

const ITEMS_PER_PAGE = 6;

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

const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const { data: events, isLoading } = useQuery({
    queryKey: ['/api/events'],
  });

  // Split events into upcoming and past
  const now = new Date();
  const upcoming = events?.filter((event: Event) => new Date(event.date) >= now) || [];
  const past = events?.filter((event: Event) => new Date(event.date) < now) || [];
  
  // Filter by active tab
  const filteredEvents = activeTab === 'upcoming' ? upcoming : past;
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (activeTab === 'upcoming') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleTabChange = (tab: 'upcoming' | 'past') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Header Banner */}
      <section className="relative bg-[#4A90E2] py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/90 to-[#4A90E2]/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517649763962-0c623066013b')" }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">Event & Kegiatan</h1>
            <p className="font-nunito text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Jadilah bagian dari berbagai kegiatan olahraga rekreasi bersama KORMI Kota Bandung
            </p>
          </div>
        </div>
      </section>

      {/* Event Calendar Preview */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins font-semibold text-xl text-[#333333]">
              <Calendar className="inline-block mr-2 text-[#2E8B57]" /> 
              Kalender Kegiatan
            </h2>
            <div className="text-[#4A90E2] font-poppins font-semibold text-sm">
              {format(new Date(), "MMMM yyyy", { locale: id })}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-1 min-w-[600px]">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, i) => (
                <div key={i} className="text-center py-2 font-poppins font-semibold text-sm text-gray-600">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                // This is just UI preview, not actual calendar logic
                const isToday = i === 14;
                const hasEvent = [3, 10, 17, 24].includes(i);
                
                return (
                  <div 
                    key={i} 
                    className={`relative h-14 border rounded-md flex items-center justify-center
                      ${isToday ? 'bg-[#2E8B57] text-white' : 
                      hasEvent ? 'bg-[#2E8B57]/10 hover:bg-[#2E8B57]/20' : 
                      'hover:bg-gray-100'} 
                      cursor-pointer transition-colors`}
                  >
                    <span className="font-poppins">{i < 30 ? i + 1 : i - 29}</span>
                    {hasEvent && !isToday && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF7A45]"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Events List */}
      <section className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-gray-200 p-1">
              <button 
                onClick={() => handleTabChange('upcoming')}
                className={`px-6 py-2 rounded-full ${
                  activeTab === 'upcoming' 
                    ? 'bg-[#2E8B57] text-white' 
                    : 'text-dark hover:text-[#2E8B57]'
                } font-poppins font-semibold text-sm transition-colors`}
              >
                Event Mendatang
              </button>
              <button 
                onClick={() => handleTabChange('past')}
                className={`px-6 py-2 rounded-full ${
                  activeTab === 'past' 
                    ? 'bg-[#2E8B57] text-white' 
                    : 'text-dark hover:text-[#2E8B57]'
                } font-poppins font-semibold text-sm transition-colors`}
              >
                Event Sebelumnya
              </button>
            </div>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
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
            ) : paginatedEvents.length > 0 ? (
              paginatedEvents.map((event: Event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <div className="text-[#2E8B57] text-6xl mb-4">
                  <span role="img" aria-label="calendar">📅</span>
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-2">
                  {activeTab === 'upcoming' 
                    ? 'Belum ada event mendatang' 
                    : 'Belum ada event sebelumnya'}
                </h3>
                <p className="font-nunito text-gray-600 mb-4">
                  {activeTab === 'upcoming' 
                    ? 'Nantikan event-event menarik dari KORMI Kota Bandung' 
                    : 'Event sebelumnya akan ditampilkan di sini'}
                </p>
                {activeTab === 'past' && (
                  <Button
                    onClick={() => handleTabChange('upcoming')}
                    className="font-poppins bg-[#2E8B57] hover:bg-[#25704d]"
                  >
                    Lihat Event Mendatang
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="inline-flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center border text-gray-600 hover:border-[#2E8B57] hover:text-[#2E8B57] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                  let pageNumber;
                  
                  if (totalPages <= 5) {
                    pageNumber = idx + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = idx + 1;
                    if (idx === 4) pageNumber = totalPages;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + idx;
                    if (idx === 0) pageNumber = 1;
                  } else {
                    pageNumber = currentPage - 2 + idx;
                    if (idx === 0) pageNumber = 1;
                    if (idx === 4) pageNumber = totalPages;
                  }
                  
                  return (
                    <Button
                      key={idx}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentPage === pageNumber 
                          ? 'bg-[#2E8B57] text-white' 
                          : 'border border-gray-300 text-gray-600 hover:border-[#2E8B57] hover:text-[#2E8B57]'
                      } transition-colors`}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full flex items-center justify-center border text-gray-600 hover:border-[#2E8B57] hover:text-[#2E8B57] transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Photo Gallery Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-poppins font-bold text-3xl text-[#333333] mb-2">Dokumentasi Event</h2>
            <p className="font-nunito text-gray-600 max-w-3xl mx-auto">
              Momen-momen berkesan dari berbagai event KORMI Kota Bandung
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative group overflow-hidden rounded-lg h-40 md:h-56">
              <img 
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b" 
                alt="Festival Olahraga" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-poppins font-semibold">Festival Olahraga Bandung 2023</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg h-40 md:h-56">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" 
                alt="Yoga di Taman" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-poppins font-semibold">Workshop Yoga di Taman</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg h-40 md:h-56">
              <img 
                src="https://images.unsplash.com/photo-1574271143515-5cddf8da19be" 
                alt="Turnamen Olahraga" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-poppins font-semibold">Turnamen Antar Komunitas</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg h-40 md:h-56">
              <img 
                src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef3" 
                alt="Pelatihan" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-poppins font-semibold">Pelatihan Instruktur Olahraga</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-[#2E8B57] hover:bg-[#25704d]">
              Lihat Semua Dokumentasi
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
