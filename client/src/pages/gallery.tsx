import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GalleryItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import GalleryItemComponent from "@/components/gallery/gallery-item";

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const { data: galleryItems, isLoading } = useQuery({
    queryKey: ['/api/gallery', activeCategory].filter(Boolean),
  });

  // Get unique categories
  const { data: allGalleryItems } = useQuery({
    queryKey: ['/api/gallery'],
  });
  
  const categories = allGalleryItems ? 
    Array.from(new Set(allGalleryItems.map((item: GalleryItem) => item.category))) : 
    [];

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
  };

  return (
    <>
      {/* Header Banner */}
      <section className="relative bg-[#4A90E2] py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/90 to-[#4A90E2]/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574271143515-5cddf8da19be')" }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">Galeri</h1>
            <p className="font-nunito text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Momen-momen kebersamaan dalam berbagai kegiatan olahraga rekreasi KORMI Kota Bandung
            </p>
          </div>
        </div>
      </section>
      
      {/* Gallery Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Gallery Filter */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-wrap justify-center gap-2">
              <Button
                onClick={() => handleCategoryClick(null)}
                className={`${
                  activeCategory === null
                    ? 'bg-[#2E8B57] text-white hover:bg-[#25704d]'
                    : 'bg-white border border-gray-300 text-[#333333] hover:border-[#2E8B57] hover:text-[#2E8B57]'
                } font-poppins font-semibold text-sm px-4 py-2 rounded-full transition-colors h-auto`}
              >
                Semua
              </Button>
              
              {categories.map((category: string) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`${
                    activeCategory === category
                      ? 'bg-[#2E8B57] text-white hover:bg-[#25704d]'
                      : 'bg-white border border-gray-300 text-[#333333] hover:border-[#2E8B57] hover:text-[#2E8B57]'
                  } font-poppins font-semibold text-sm px-4 py-2 rounded-full transition-colors h-auto`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="relative overflow-hidden rounded-lg h-40 md:h-56 bg-gray-200 animate-pulse"></div>
              ))
            ) : galleryItems?.length > 0 ? (
              galleryItems.map((item: GalleryItem) => (
                <GalleryItemComponent key={item.id} item={item} />
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-12">
                <div className="text-[#2E8B57] text-6xl mb-4">
                  <span role="img" aria-label="camera">📷</span>
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-2">Belum ada foto dalam kategori ini</h3>
                <p className="font-nunito text-gray-600 mb-4">
                  Silahkan pilih kategori lain atau lihat semua foto
                </p>
                <Button
                  onClick={() => setActiveCategory(null)}
                  className="font-poppins bg-[#2E8B57] hover:bg-[#25704d]"
                >
                  Lihat Semua Foto
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Instagram Feed */}
      <section className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-poppins font-bold text-2xl text-[#333333]">Instagram Feed</h2>
            <a 
              href="https://instagram.com/kormibandung" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-poppins font-semibold text-[#4A90E2] hover:text-[#3a77c2] transition-colors inline-flex items-center"
            >
              <Instagram className="mr-2 h-5 w-5" /> @kormibandung
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* We'll use placeholder images for the Instagram feed */}
            {['photo-1516939884455-1445c8652f83', 'photo-1551632811-561732d1e306', 'photo-1574271143515-5cddf8da19be', 
              'photo-1526676037777-05a232554f77', 'photo-1565992441121-4367c2967103', 'photo-1517649763962-0c623066013b'].map((id, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg h-32 md:h-40">
                <img 
                  src={`https://images.unsplash.com/${id}`} 
                  alt="Instagram Post" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white h-6 w-6" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://instagram.com/kormibandung" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center font-poppins font-semibold bg-[#2E8B57] text-white px-6 py-3 rounded-full hover:bg-[#25704d] transition-colors"
            >
              <Instagram className="mr-2 h-5 w-5" /> Follow di Instagram
            </a>
          </div>
        </div>
      </section>
      
      {/* Video Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-poppins font-bold text-2xl text-[#333333] mb-2">Video Kegiatan</h2>
            <p className="font-nunito text-gray-600 max-w-3xl mx-auto">
              Dokumentasi video dari berbagai kegiatan KORMI Kota Bandung
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* For video placeholders, we'll show generic placeholders */}
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md">
                <div className="relative bg-gray-200 h-48 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#2E8B57] flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-poppins font-semibold text-lg mb-1">Video Kegiatan {index + 1}</h3>
                  <p className="font-nunito text-gray-600 text-sm">
                    Dokumentasi kegiatan KORMI Kota Bandung
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-[#2E8B57] hover:bg-[#25704d]">
              Lihat Semua Video
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
