import { Button } from "@/components/ui/button";
import { CalendarCheck, Terminal } from "lucide-react";
import { Link } from "wouter";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/90 to-[#4A90E2]/80 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1574271143515-5cddf8da19be')",
          filter: "saturate(1.2)"
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
        <div className="max-w-2xl text-white">
          <h1 className="font-poppins font-bold text-3xl md:text-5xl leading-tight mb-4">
            Aktif, Sehat, Bahagia Bersama KORMI Kota Bandung
          </h1>
          <p className="font-nunito text-lg md:text-xl mb-8 text-white/90">
            Bergabunglah dengan komunitas olahraga rekreasi di Bandung untuk gaya hidup aktif dan sehat bersama.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/events">
              <Button 
                className="font-poppins font-semibold bg-[#FF7A45] hover:bg-[#e66a35] text-white px-6 py-3 rounded-full transition-colors inline-flex items-center h-auto"
              >
                <CalendarCheck className="mr-2 h-5 w-5" /> Lihat Event
              </Button>
            </Link>
            <Link href="/sports">
              <Button 
                variant="outline" 
                className="font-poppins font-semibold bg-white hover:bg-gray-100 text-[#2E8B57] border-0 px-6 py-3 rounded-full transition-colors inline-flex items-center h-auto"
              >
                <Terminal className="mr-2 h-5 w-5" /> Jelajahi Olahraga
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F5F7FA] to-transparent z-10"></div>
    </section>
  );
};

export default HeroBanner;
