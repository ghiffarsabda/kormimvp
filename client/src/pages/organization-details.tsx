import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Link } from "wouter";
import { Organization, SportCategory, Event } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { MapPin, Calendar, Phone, ArrowLeft, Share2, Clock, Users } from "lucide-react";
import { Bicycle, Running, SpaIcon, Hiking, TableTennisIcon, SwimmerIcon } from "@/lib/icons";

const OrganizationDetails = () => {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  
  const { data: organization, isLoading: isOrgLoading } = useQuery({
    queryKey: ['/api/organizations', id],
  });
  
  const { data: categories } = useQuery({
    queryKey: ['/api/sport-categories'],
  });
  
  const { data: events } = useQuery({
    queryKey: ['/api/events'],
  });
  
  // Redirect to 404 if organization not found after loading
  useEffect(() => {
    if (!isOrgLoading && !organization) {
      setNotFound(true);
    }
  }, [isOrgLoading, organization]);
  
  // Redirect to 404 page if not found
  useEffect(() => {
    if (notFound) {
      navigate("/not-found");
    }
  }, [notFound, navigate]);
  
  // Get related events (same category as organization)
  const relatedEvents = events?.filter((event: Event) => 
    organization && event.organizationId === organization.id
  ) || [];
  
  const category = categories?.find((cat: SportCategory) => 
    organization && cat.id === organization.sportCategoryId
  );
  
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'bicycle':
        return <Bicycle className="text-4xl text-[#4A90E2]" />;
      case 'running':
        return <Running className="text-4xl text-[#4A90E2]" />;
      case 'spa':
        return <SpaIcon className="text-4xl text-[#4A90E2]" />;
      case 'hiking':
        return <Hiking className="text-4xl text-[#4A90E2]" />;
      case 'table-tennis':
        return <TableTennisIcon className="text-4xl text-[#4A90E2]" />;
      case 'swimmer':
        return <SwimmerIcon className="text-4xl text-[#4A90E2]" />;
      default:
        return <Running className="text-4xl text-[#4A90E2]" />;
    }
  };
  
  if (isOrgLoading) {
    return (
      <div className="py-12 bg-[#F5F7FA] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="flex">
                  <div className="h-5 w-5 bg-gray-200 rounded-full mt-1 mr-2"></div>
                  <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex">
                  <div className="h-5 w-5 bg-gray-200 rounded-full mt-1 mr-2"></div>
                  <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                </div>
                <div className="flex">
                  <div className="h-5 w-5 bg-gray-200 rounded-full mt-1 mr-2"></div>
                  <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!organization) return null;
  
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
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">{organization.name}</h1>
            <p className="font-nunito text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {category?.name || "Komunitas Olahraga"}
            </p>
          </div>
        </div>
      </section>
      
      <div className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/sports">
                <a className={buttonVariants({ variant: "ghost" }) + " mb-6 inline-flex items-center gap-2 pl-2 font-poppins"}>
                  <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Komunitas
                </a>
              </Link>
            </div>
            
            <Card className="mb-8 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-[#4A90E2]/10 p-8 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-6">
                    {getIcon(organization.icon)}
                  </div>
                  <h3 className="font-poppins font-semibold text-xl text-center">{organization.name}</h3>
                  <span className="text-sm font-nunito text-gray-600 text-center">{category?.name}</span>
                </div>
                
                <div className="md:w-2/3 p-8">
                  <div className="flex justify-between mb-6">
                    <h2 className="font-poppins font-bold text-2xl">Detail Komunitas</h2>
                    <button className="flex items-center gap-2 text-[#4A90E2] hover:text-[#3a77c2] transition-colors">
                      <Share2 className="h-5 w-5" /> Bagikan
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <MapPin className="text-[#4A90E2] mt-1 w-5 h-5 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="font-poppins font-semibold text-sm">Lokasi</h4>
                        <p className="font-nunito text-gray-700">{organization.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="text-[#4A90E2] mt-1 w-5 h-5 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="font-poppins font-semibold text-sm">Jadwal</h4>
                        <p className="font-nunito text-gray-700">{organization.schedule}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="text-[#4A90E2] mt-1 w-5 h-5 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="font-poppins font-semibold text-sm">Kontak</h4>
                        <p className="font-nunito text-gray-700">{organization.contact}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="text-[#4A90E2] mt-1 w-5 h-5 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="font-poppins font-semibold text-sm">Jumlah Anggota</h4>
                        <p className="font-nunito text-gray-700">{organization.memberCount || "30+"} Anggota</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="font-poppins bg-[#2E8B57] hover:bg-[#25704d] w-full sm:w-auto">
                    Gabung Komunitas
                  </Button>
                </div>
              </div>
            </Card>
            
            <div className="mb-8">
              <h3 className="font-poppins font-bold text-xl mb-4">Tentang {organization.name}</h3>
              <div className="font-nunito text-gray-700 space-y-4">
                <p>{organization.description || `${organization.name} adalah organisasi olahraga rekreasi yang bergerak di bidang ${category?.name}. Komunitas ini aktif menyelenggarakan berbagai kegiatan olahraga rekreasi untuk masyarakat Kota Bandung.`}</p>
                <p>Didirikan untuk memfasilitasi para penggemar {category?.name} di Kota Bandung, komunitas ini telah berkembang pesat dan secara rutin mengadakan pertemuan, latihan bersama, serta berpartisipasi dalam berbagai event olahraga di kota Bandung dan sekitarnya.</p>
              </div>
            </div>
            
            {relatedEvents.length > 0 && (
              <div className="mb-8">
                <h3 className="font-poppins font-bold text-xl mb-4">Event Mendatang</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedEvents.map((event: Event) => (
                    <Card key={event.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-5">
                        <h4 className="font-poppins font-semibold text-lg mb-2">{event.title}</h4>
                        <div className="flex items-center text-gray-600 mb-3">
                          <Calendar className="mr-2 text-[#4A90E2] h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-3">
                          <Clock className="mr-2 text-[#4A90E2] h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="mr-2 text-[#4A90E2] h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <Button className="font-poppins font-semibold text-sm bg-[#2E8B57] text-white px-4 py-2 rounded-full hover:bg-[#25704d] transition-colors h-9">
                          Daftar
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-10">
              <Link href="/join">
                <a className={buttonVariants({ variant: "default" }) + " font-poppins bg-[#2E8B57] hover:bg-[#25704d]"}>
                  Gabung Komunitas
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationDetails;