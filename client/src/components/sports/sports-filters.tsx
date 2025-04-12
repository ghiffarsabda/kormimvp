import { useEffect, useState } from "react";
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SportCategory } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

interface SportsFiltersProps {
  onSearch: (term: string) => void;
  onCategoryFilter: (categoryId: number | null) => void;
  selectedCategory: number | null;
}

const SportsFilters = ({ onSearch, onCategoryFilter, selectedCategory }: SportsFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categories, isLoading } = useQuery({
    queryKey: ['/api/sport-categories'],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCategoryClick = (categoryId: number | null) => {
    onCategoryFilter(categoryId === selectedCategory ? null : categoryId);
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, onSearch]);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <form className="relative flex-grow" onSubmit={handleSearch}>
          <Input
            type="text"
            placeholder="Cari komunitas olahraga..."
            className="w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:border-[#2E8B57] font-nunito"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </form>
        
        <div className="flex-shrink-0">
          <Button className="w-full md:w-auto py-3 px-6 rounded-full bg-[#FF7A45] text-white font-poppins font-semibold text-sm hover:bg-[#e66a35] transition-colors h-auto">
            <PlusCircle className="mr-2 h-5 w-5" /> Ajukan Komunitas Baru
          </Button>
        </div>
      </div>
      
      {/* Filter Chips */}
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
        
        {isLoading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="inline-block px-4 py-2 rounded-full bg-gray-200 animate-pulse h-9 w-20"></div>
          ))
        ) : (
          categories?.map((category: SportCategory) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`inline-block px-4 py-2 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-[#2E8B57]/10 border border-[#2E8B57] text-[#2E8B57]'
                  : 'bg-white border border-gray-300 text-sm hover:border-[#2E8B57] hover:text-[#2E8B57]'
              } text-sm font-nunito cursor-pointer transition-colors`}
            >
              {category.name}
              {selectedCategory === category.id && (
                <span className="ml-1">×</span>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default SportsFilters;
