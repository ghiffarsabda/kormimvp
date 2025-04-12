import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { News } from "@shared/schema";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Link } from "wouter";

interface NewsCardProps {
  news: News;
  isFeatured?: boolean;
}

const NewsCard = ({ news, isFeatured = false }: NewsCardProps) => {
  const formattedDate = format(new Date(news.date), "dd MMMM yyyy", { locale: id });
  const categoryColorMap: Record<string, string> = {
    "Event": "primary",
    "Artikel": "secondary",
    "Komunitas": "accent"
  };
  
  const categoryColor = categoryColorMap[news.category] || "primary";
  const categoryBgColor = categoryColor === "primary" ? "bg-[#2E8B57]/10" : 
                          categoryColor === "secondary" ? "bg-[#4A90E2]/10" : 
                          "bg-[#FF7A45]/10";
  const categoryTextColor = categoryColor === "primary" ? "text-[#2E8B57]" : 
                            categoryColor === "secondary" ? "text-[#4A90E2]" : 
                            "text-[#FF7A45]";

  if (isFeatured) {
    return (
      <Card className="md:col-span-2 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 h-64 md:h-auto">
            <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col">
            <div className="mb-2">
              <span className={`inline-block ${categoryBgColor} ${categoryTextColor} text-xs font-poppins font-semibold px-3 py-1 rounded-full`}>
                {news.category}
              </span>
              <span className="text-xs text-gray-500 ml-2">{formattedDate}</span>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-2">{news.title}</h3>
            <p className="font-nunito text-gray-600 mb-4 flex-grow">
              {news.excerpt}
            </p>
            <Link href={`/news/${news.id}`}>
              <Button 
                variant="link" 
                className="p-0 font-poppins font-semibold text-[#4A90E2] hover:text-[#3a77c2] transition-colors inline-flex items-center mt-auto h-auto"
              >
                Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48">
        <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-5">
        <div className="mb-2">
          <span className={`inline-block ${categoryBgColor} ${categoryTextColor} text-xs font-poppins font-semibold px-3 py-1 rounded-full`}>
            {news.category}
          </span>
          <span className="text-xs text-gray-500 ml-2">{formattedDate}</span>
        </div>
        <h3 className="font-poppins font-semibold text-lg mb-2">{news.title}</h3>
        <p className="font-nunito text-gray-600 mb-4 line-clamp-3">
          {news.excerpt}
        </p>
        <Link href={`/news/${news.id}`}>
          <Button 
            variant="link" 
            className="p-0 font-poppins font-semibold text-[#4A90E2] hover:text-[#3a77c2] transition-colors inline-flex items-center h-auto"
          >
            Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
