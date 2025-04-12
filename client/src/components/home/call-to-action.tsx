import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, PlusCircle } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#2E8B57] to-[#4A90E2] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-poppins font-bold text-3xl mb-4">Jadilah Bagian dari Komunitas Olahraga Bandung</h2>
        <p className="font-nunito text-lg mb-8 max-w-2xl mx-auto text-white/90">
          Bergabung dengan KORMI Kota Bandung dan temukan komunitas olahraga yang sesuai dengan minat dan passionmu.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/join">
            <Button 
              variant="outline"
              className="font-poppins font-semibold bg-white text-[#2E8B57] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center h-auto border-0"
            >
              <Users className="mr-2 h-5 w-5" /> Gabung Komunitas
            </Button>
          </Link>
          <Link href="/sports">
            <Button 
              className="font-poppins font-semibold bg-[#FF7A45] hover:bg-[#e66a35] text-white px-6 py-3 rounded-full transition-colors inline-flex items-center h-auto"
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Daftarkan Komunitas Baru
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
