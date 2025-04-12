import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { News } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import NewsCard from "@/components/news/news-card";

const ITEMS_PER_PAGE = 6;

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['/api/news'],
  });

  // Get unique categories
  const categories = newsItems ? 
    Array.from(new Set(newsItems.map((news: News) => news.category))) : 
    [];

  // Filter news based on search term and category
  const filteredNews = newsItems?.filter((news: News) => {
    const matchesSearch = searchTerm === "" || 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || 
      news.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">Berita & Artikel</h1>
            <p className="font-nunito text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Update terbaru seputar kegiatan olahraga rekreasi dan komunitas KORMI Kota Bandung
            </p>
          </div>
        </div>
      </section>
      
      {/* News Content */}
      <section className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-8">
            <form className="flex flex-col md:flex-row gap-4 mb-4" onSubmit={handleSearch}>
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Cari berita atau artikel..."
                  className="w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:border-[#2E8B57] font-nunito"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              
              <Button type="submit" className="bg-[#2E8B57] hover:bg-[#25704d] rounded-full">
                Cari
              </Button>
            </form>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`inline-block px-4 py-2 rounded-full ${
                  selectedCategory === null
                    ? 'bg-[#2E8B57]/10 border border-[#2E8B57] text-[#2E8B57]'
                    : 'bg-white border border-gray-300 text-sm hover:border-[#2E8B57] hover:text-[#2E8B57]'
                } text-sm font-nunito cursor-pointer transition-colors`}
              >
                Semua
              </button>
              
              {categories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`inline-block px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-[#2E8B57]/10 border border-[#2E8B57] text-[#2E8B57]'
                      : 'bg-white border border-gray-300 text-sm hover:border-[#2E8B57] hover:text-[#2E8B57]'
                  } text-sm font-nunito cursor-pointer transition-colors`}
                >
                  {category}
                  {selectedCategory === category && (
                    <span className="ml-1">×</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Featured News */}
          {currentPage === 1 && filteredNews.length > 0 && !searchTerm && !selectedCategory && (
            <div className="mb-10">
              <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#333333] mb-6">
                Berita Utama
              </h2>
              <NewsCard news={filteredNews[0]} isFeatured={true} />
            </div>
          )}
          
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-5">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                  </CardContent>
                </Card>
              ))
            ) : paginatedNews.length > 0 ? (
              paginatedNews.map((news: News, index: number) => (
                // Skip the first news item on page 1 if it's featured and there's no filter
                (currentPage !== 1 || index !== 0 || searchTerm || selectedCategory) && (
                  <NewsCard key={news.id} news={news} />
                )
              )).filter(Boolean) // Filter out null/undefined (the skipped item)
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <div className="text-[#2E8B57] text-6xl mb-4">
                  <span role="img" aria-label="search">🔍</span>
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-2">Tidak ada hasil yang ditemukan</h3>
                <p className="font-nunito text-gray-600 mb-4">
                  Coba ubah filter pencarian atau kata kunci Anda
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                  }}
                  className="font-poppins bg-[#2E8B57] hover:bg-[#25704d]"
                >
                  Reset Pencarian
                </Button>
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
      
      {/* Subscribe Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#4A90E2]/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#333333] mb-4">
              Dapatkan Update Terbaru
            </h2>
            <p className="font-nunito text-gray-600 mb-6 max-w-2xl mx-auto">
              Berlangganan newsletter kami untuk mendapatkan informasi terbaru seputar 
              kegiatan olahraga rekreasi dan komunitas KORMI Kota Bandung
            </p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Alamat email Anda"
                className="rounded-full border-gray-300 focus:border-[#2E8B57]"
                required
              />
              <Button className="bg-[#2E8B57] hover:bg-[#25704d] rounded-full px-6">
                Langganan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
