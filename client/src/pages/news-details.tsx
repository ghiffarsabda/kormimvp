import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Link } from "wouter";
import { News } from "@shared/schema";
import { buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowLeft, Share2, Calendar, User } from "lucide-react";
import NewsCard from "@/components/news/news-card";

const NewsDetails = () => {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  
  const { data: newsItem, isLoading: isNewsLoading } = useQuery({
    queryKey: ['/api/news', id],
  });
  
  const { data: relatedNews, isLoading: isRelatedLoading } = useQuery({
    queryKey: ['/api/news'],
  });

  // Filter out current news from related news and limit to 3 items
  const filteredRelatedNews = relatedNews?.filter((news: News) => String(news.id) !== id).slice(0, 3) || [];
  
  // Redirect to 404 if news not found after loading
  useEffect(() => {
    if (!isNewsLoading && !newsItem) {
      setNotFound(true);
    }
  }, [isNewsLoading, newsItem]);
  
  // Redirect to 404 page if not found
  useEffect(() => {
    if (notFound) {
      navigate("/not-found");
    }
  }, [notFound, navigate]);
  
  if (isNewsLoading) {
    return (
      <div className="py-12 bg-[#F5F7FA] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!newsItem) return null;
  
  // Ensure the date is properly formatted or use a fallback date
  const formattedDate = newsItem.date ? format(new Date(newsItem.date), "dd MMMM yyyy", { locale: id }) : "Tanggal tidak tersedia";
  
  const categoryColorMap: Record<string, string> = {
    "Event": "primary",
    "Artikel": "secondary", 
    "Komunitas": "accent"
  };
  
  const categoryColor = categoryColorMap[newsItem.category] || "primary";
  const categoryBgColor = categoryColor === "primary" ? "bg-[#2E8B57]/10" : 
                        categoryColor === "secondary" ? "bg-[#4A90E2]/10" : 
                        "bg-[#FF7A45]/10";
  const categoryTextColor = categoryColor === "primary" ? "text-[#2E8B57]" : 
                          categoryColor === "secondary" ? "text-[#4A90E2]" : 
                          "text-[#FF7A45]";
  
  return (
    <>
      {/* Header Banner */}
      <section className="relative bg-[#4A90E2] py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/90 to-[#4A90E2]/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526676037777-05a232554f77')" }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">{newsItem.title}</h1>
            <p className="font-nunito text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {newsItem.category}
            </p>
          </div>
        </div>
      </section>
      
      <div className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link href="/news">
                <a className={buttonVariants({ variant: "ghost" }) + " mb-6 inline-flex items-center gap-2 pl-2 font-poppins"}>
                  <ArrowLeft className="h-4 w-4" /> Kembali ke Berita
                </a>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
              <div className="h-64 sm:h-80 md:h-96">
                <img 
                  src={newsItem.imageUrl} 
                  alt={newsItem.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center mb-4 gap-3">
                  <span className={`inline-block ${categoryBgColor} ${categoryTextColor} text-xs font-poppins font-semibold px-3 py-1 rounded-full`}>
                    {newsItem.category}
                  </span>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formattedDate}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="h-4 w-4 mr-1" />
                    <span>Admin KORMI</span>
                  </div>
                  
                  <div className="flex-grow"></div>
                  
                  <button className="flex items-center gap-1 text-[#4A90E2] hover:text-[#3a77c2] transition-colors text-sm">
                    <Share2 className="h-4 w-4" /> Bagikan
                  </button>
                </div>
                
                <h2 className="font-poppins font-bold text-2xl sm:text-3xl mb-4">{newsItem.title}</h2>
                
                <div className="font-nunito text-gray-700 space-y-4">
                  <p className="font-semibold">{newsItem.excerpt}</p>
                  
                  {/* HTML content would typically come from API, but we'll simulate it for now */}
                  <p>{newsItem.content}</p>
                  
                  <p>Kegiatan ini merupakan salah satu program rutin KORMI Kota Bandung untuk mendorong masyarakat agar lebih aktif berolahraga dan menjadikan olahraga rekreasi sebagai bagian dari gaya hidup sehat.</p>
                  
                  <p>KORMI Kota Bandung terus berkomitmen untuk mengembangkan olahraga rekreasi di Kota Bandung dengan melibatkan seluruh komunitas olahraga dan stakeholder terkait. Dengan terselenggaranya kegiatan ini, diharapkan dapat semakin menumbuhkan minat masyarakat terhadap olahraga rekreasi.</p>
                </div>
              </div>
            </div>
            
            {/* Related News */}
            {filteredRelatedNews.length > 0 && (
              <div className="mt-12">
                <h3 className="font-poppins font-bold text-2xl mb-6">Artikel Terkait</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredRelatedNews.map((news: News) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;