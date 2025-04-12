import { Link } from "wouter";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  MapPin, 
  Mail, 
  Phone 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2E8B57] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-[#2E8B57] mr-3">
                <span className="font-bold">K</span>
              </div>
              <div>
                <h2 className="font-poppins font-bold text-xl">KORMI</h2>
                <p className="text-xs text-white/80">Kota Bandung</p>
              </div>
            </div>
            <p className="font-nunito text-white/80 mb-4">
              Komite Olahraga Rekreasi Masyarakat Indonesia (KORMI) Kota Bandung adalah organisasi yang membina dan mengembangkan kegiatan olahraga rekreasi masyarakat.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Menu</h3>
            <ul className="space-y-2 font-nunito">
              <li>
                <Link href="/">
                  <a className="text-white/80 hover:text-white transition-colors">Beranda</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-white/80 hover:text-white transition-colors">Tentang KORMI</a>
                </Link>
              </li>
              <li>
                <Link href="/sports">
                  <a className="text-white/80 hover:text-white transition-colors">Cabang Olahraga</a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a className="text-white/80 hover:text-white transition-colors">Event & Kegiatan</a>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <a className="text-white/80 hover:text-white transition-colors">Berita & Artikel</a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-white/80 hover:text-white transition-colors">Galeri</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-white/80 hover:text-white transition-colors">Kontak</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Cabang Olahraga */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Cabang Olahraga</h3>
            <ul className="space-y-2 font-nunito">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Sepeda</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lari</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Yoga</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Hiking</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Pingpong</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Renang</a></li>
              <li>
                <Link href="/sports">
                  <a className="text-white/80 hover:text-white transition-colors">Lihat Semua...</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Kontak</h3>
            <ul className="space-y-3 font-nunito">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 w-4 h-4" />
                <span className="text-white/80">Jl. Aceh No. 66, Bandung, Jawa Barat 40115</span>
              </li>
              <li className="flex items-start">
                <Mail className="mt-1 mr-3 w-4 h-4" />
                <span className="text-white/80">info@kormikotabandung.id</span>
              </li>
              <li className="flex items-start">
                <Phone className="mt-1 mr-3 w-4 h-4" />
                <span className="text-white/80">+62 22 7123456</span>
              </li>
              <li className="flex items-start">
                <FaWhatsapp className="mt-1 mr-3 w-4 h-4" />
                <span className="text-white/80">+62 812 3456 7890</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-nunito text-white/80 text-sm">
              &copy; {new Date().getFullYear()} KORMI Kota Bandung. All rights reserved.
            </p>
            <div className="flex mt-4 md:mt-0">
              <a href="#" className="text-sm text-white/80 hover:text-white transition-colors mx-3">Kebijakan Privasi</a>
              <a href="#" className="text-sm text-white/80 hover:text-white transition-colors mx-3">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
