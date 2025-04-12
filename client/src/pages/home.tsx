import HeroBanner from '@/components/home/hero-banner';
import UpcomingEvents from '@/components/home/upcoming-events';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Users } from 'lucide-react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { News } from '@shared/schema';
import NewsCard from '@/components/news/news-card';
import GalleryItemComponent from '@/components/gallery/gallery-item';
import CallToAction from '@/components/home/call-to-action';

const Home = () => {
  const { data: news, isLoading: isNewsLoading } = useQuery({
    queryKey: ['/api/news'],
  });

  const { data: gallery, isLoading: isGalleryLoading } = useQuery({
    queryKey: ['/api/gallery'],
  });

  return (
    <>
      <HeroBanner />
      
      <UpcomingEvents />
      
      {/* About Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl text-[#333333] mb-2">Tentang KORMI Kota Bandung</h2>
            <p className="font-nunito text-gray-600 max-w-3xl mx-auto">
              Komite Olahraga Rekreasi Masyarakat Indonesia (KORMI) Kota Bandung adalah organisasi yang membina dan mengembangkan kegiatan olahraga rekreasi masyarakat di Kota Bandung.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h3 className="font-poppins font-semibold text-2xl text-[#2E8B57] mb-4">Visi & Misi</h3>
              
              <div className="mb-6">
                <h4 className="font-poppins font-semibold text-lg mb-2">Visi</h4>
                <p className="font-nunito text-gray-700">
                  Mewujudkan masyarakat Kota Bandung yang aktif, sehat, dan bahagia melalui kegiatan olahraga rekreasi yang inklusif dan berkelanjutan.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-poppins font-semibold text-lg mb-2">Misi</h4>
                <ul className="font-nunito text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-[#2E8B57] mt-1 mr-2 h-5 w-5" />
                    <span>Memasyarakatkan olahraga rekreasi sebagai gaya hidup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#2E8B57] mt-1 mr-2 h-5 w-5" />
                    <span>Memfasilitasi pengembangan komunitas olahraga rekreasi</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#2E8B57] mt-1 mr-2 h-5 w-5" />
                    <span>Menyelenggarakan event olahraga rekreasi yang inovatif</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#2E8B57] mt-1 mr-2 h-5 w-5" />
                    <span>Meningkatkan partisipasi masyarakat dalam kegiatan olahraga rekreasi</span>
                  </li>
                </ul>
              </div>
              
              <Link href="/about">
                <a className={buttonVariants({ variant: "link" }) + " p-0 font-poppins font-semibold text-[#4A90E2] hover:text-[#3a77c2] transition-colors inline-flex items-center h-auto"}>
                  Selengkapnya tentang KORMI <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="relative rounded-xl overflow-hidden h-96">
                <img 
                  src="https://images.unsplash.com/photo-1540539234-c14a20fb7c7b" 
                  alt="KORMI Kota Bandung" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="text-[#2E8B57] h-5 w-5" />
                      <span className="font-poppins font-semibold">Didirikan 2018</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="text-[#2E8B57] h-5 w-5" />
                      <span className="font-poppins font-semibold">50+ Komunitas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#333333]">Berita & Artikel</h2>
            <Link href="/news">
              <a className="font-poppins font-semibold text-[#4A90E2] hover:text-[#3a77c2] transition-colors inline-flex items-center">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isNewsLoading ? (
              <>
                <Card className="md:col-span-2 bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 h-64 md:h-auto bg-gray-200 animate-pulse"></div>
                    <div className="md:w-1/2 p-6 flex flex-col">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3 mt-auto"></div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-5">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {news?.length > 0 && <NewsCard news={news[0]} isFeatured={true} />}
                {news?.length > 1 && <NewsCard news={news[1]} />}
              </>
            )}
          </div>
        </div>
      </section>
      
      <CallToAction />
      
      {/* Gallery Preview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-poppins font-bold text-3xl text-[#333333] mb-2">Galeri</h2>
            <p className="font-nunito text-gray-600 max-w-3xl mx-auto">
              Momen-momen kebersamaan dalam berbagai kegiatan olahraga rekreasi KORMI Kota Bandung
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isGalleryLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="relative overflow-hidden rounded-lg h-40 md:h-56 bg-gray-200 animate-pulse"></div>
              ))
            ) : (
              gallery?.slice(0, 4).map((item) => (
                <GalleryItemComponent key={item.id} item={item} />
              ))
            )}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/gallery">
              <a className={buttonVariants({ variant: "outline" }) + " border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white"}>
                Lihat Semua Galeri
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
