import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Phone } from "lucide-react";
import { Organization, SportCategory } from "@shared/schema";
import { Bicycle, Running, SpaIcon, Hiking, TableTennisIcon, SwimmerIcon } from "@/lib/icons";
import { Link } from "wouter";

interface SportsCardProps {
  organization: Organization;
  categories: SportCategory[];
}

const SportsCard = ({ organization, categories }: SportsCardProps) => {
  const category = categories?.find(c => c.id === organization.sportCategoryId);
  
  const getIcon = () => {
    switch (organization.icon) {
      case 'bicycle':
        return <Bicycle className="text-2xl text-[#4A90E2]" />;
      case 'running':
        return <Running className="text-2xl text-[#4A90E2]" />;
      case 'spa':
        return <SpaIcon className="text-2xl text-[#4A90E2]" />;
      case 'hiking':
        return <Hiking className="text-2xl text-[#4A90E2]" />;
      case 'table-tennis':
        return <TableTennisIcon className="text-2xl text-[#4A90E2]" />;
      case 'swimmer':
        return <SwimmerIcon className="text-2xl text-[#4A90E2]" />;
      default:
        return <Running className="text-2xl text-[#4A90E2]" />;
    }
  };

  return (
    <Card className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-[#4A90E2]/10 flex items-center justify-center mr-4 flex-shrink-0">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-lg">{organization.name}</h3>
            <span className="text-sm font-nunito text-gray-600">{category?.name}</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <MapPin className="text-[#4A90E2] mt-1 w-5 h-5" />
            <span className="font-nunito text-gray-700 ml-2">{organization.location}</span>
          </div>
          <div className="flex items-start">
            <Calendar className="text-[#4A90E2] mt-1 w-5 h-5" />
            <span className="font-nunito text-gray-700 ml-2">{organization.schedule}</span>
          </div>
          <div className="flex items-start">
            <Phone className="text-[#4A90E2] mt-1 w-5 h-5" />
            <span className="font-nunito text-gray-700 ml-2">{organization.contact}</span>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link href={`/sports/${organization.id}`}>
            <Button 
              variant="link" 
              className="p-0 font-poppins text-sm text-[#4A90E2] hover:text-[#3a77c2] transition-colors inline-flex items-center h-auto"
            >
              Detail <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/join">
            <Button 
              variant="outline" 
              className="font-poppins text-sm bg-[#2E8B57]/10 text-[#2E8B57] border-0 px-3 py-1 rounded-full hover:bg-[#2E8B57]/20 transition-colors h-auto"
            >
              Gabung
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SportsCard;
