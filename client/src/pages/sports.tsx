import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SportsFilters from "@/components/sports/sports-filters";
import SportsCard from "@/components/sports/sports-card";
import { Organization, SportCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const Sports = () => {
  const [isOkb, setIsOkb] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allOrganizations, isLoading: isOrgsLoading } = useQuery({
    queryKey: ['/api/organizations'],
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['/api/sport-categories'],
  });

  // Filter organizations based on OKB/OKTB, search term, and category
  const filteredOrganizations = allOrganizations?.filter((org: Organization) => {
    const matchesType = org.isOkb === isOkb;
    const matchesSearch = searchTerm === "" || 
      org.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || 
      org.sportCategoryId === selectedCategory;
    
    return matchesType && matchesSearch && matchesCategory;
  }) || [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrganizations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrganizations = filteredOrganizations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOkbTabChange = (value: boolean) => {
    setIsOkb(value);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
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
    );
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
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">Cabang Olahraga (Inorga)</h1>
            <p className="font-nunito text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Jelajahi berbagai komunitas olahraga rekreasi yang ada di Kota Bandung
            </p>
          </div>
        </div>
      </section>
      
      {/* Cabang Olahraga Content */}
      <section id="sports" className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-gray-200 p-1">
              <button 
                onClick={() => handleOkbTabChange(true)}
                className={`px-6 py-2 rounded-full ${
                  isOkb 
                    ? 'bg-[#2E8B57] text-white' 
                    : 'text-dark hover:text-[#2E8B57]'
                } font-poppins font-semibold text-sm transition-colors`}
              >
                OKB (Di Bawah KORMI)
              </button>
              <button 
                onClick={() => handleOkbTabChange(false)}
                className={`px-6 py-2 rounded-full ${
                  !isOkb 
                    ? 'bg-[#2E8B57] text-white' 
                    : 'text-dark hover:text-[#2E8B57]'
                } font-poppins font-semibold text-sm transition-colors`}
              >
                OKTB (Tidak Di Bawah KORMI)
              </button>
            </div>
          </div>
          
          <SportsFilters 
            onSearch={handleSearch} 
            onCategoryFilter={handleCategoryFilter}
            selectedCategory={selectedCategory}
          />
          
          {/* Sport Organizations Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isOrgsLoading || isCategoriesLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md p-6 animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gray-200 mt-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 ml-2"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gray-200 mt-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 ml-2"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gray-200 mt-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 ml-2"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                  </div>
                </div>
              ))
            ) : paginatedOrganizations.length > 0 ? (
              paginatedOrganizations.map((org: Organization) => (
                <SportsCard 
                  key={org.id} 
                  organization={org} 
                  categories={categories || []}
                />
              ))
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
          {renderPagination()}
        </div>
      </section>
    </>
  );
};

export default Sports;
