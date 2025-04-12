import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, isActive, children, onClick }: NavLinkProps) => {
  return (
    <Link href={href}>
      <a 
        onClick={onClick}
        className={`font-poppins font-semibold ${
          isActive 
            ? 'text-[#2E8B57]' 
            : 'text-[#333333] hover:text-[#2E8B57]'
        } transition-colors`}
      >
        {children}
      </a>
    </Link>
  );
};

const Header = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white ${scrolled ? 'shadow-md' : 'shadow-sm'} transition-shadow`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center">
              <div className="w-12 h-12 bg-[#2E8B57] rounded-full flex items-center justify-center text-white mr-3">
                <span className="font-bold">K</span>
              </div>
              <div>
                <h1 className="font-poppins font-bold text-xl md:text-2xl text-[#2E8B57] leading-tight">KORMI</h1>
                <p className="text-xs text-gray-600 font-poppins">Kota Bandung</p>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/" isActive={location === '/'}>
              Beranda
            </NavLink>
            <NavLink href="/about" isActive={location === '/about'}>
              Tentang
            </NavLink>
            <NavLink href="/sports" isActive={location === '/sports'}>
              Cabang Olahraga
            </NavLink>
            <NavLink href="/events" isActive={location === '/events'}>
              Event
            </NavLink>
            <NavLink href="/news" isActive={location === '/news'}>
              Berita
            </NavLink>
            <NavLink href="/gallery" isActive={location === '/gallery'}>
              Galeri
            </NavLink>
            <NavLink href="/contact" isActive={location === '/contact'}>
              Kontak
            </NavLink>
            
            <div className="border-l border-gray-300 h-6 mx-2"></div>
            
            <Link href="/join">
              <Button className="font-poppins font-semibold text-sm bg-[#2E8B57] text-white px-4 py-2 rounded-full hover:bg-[#25704d] transition-colors">
                Gabung Komunitas
              </Button>
            </Link>
            
            <div className="border-l border-gray-300 h-6 mx-2"></div>
            
            <div className="flex space-x-2">
              <button className="px-2 py-1 text-sm font-semibold text-[#333333] hover:text-[#2E8B57] transition-colors">ID</button>
              <span className="text-gray-300">|</span>
              <button className="px-2 py-1 text-sm font-semibold text-gray-400 hover:text-[#2E8B57] transition-colors">EN</button>
            </div>
          </nav>

          {/* Mobile Navigation Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            className="md:hidden text-[#333333]"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              <NavLink href="/" isActive={location === '/'} onClick={closeMenu}>
                Beranda
              </NavLink>
              <NavLink href="/about" isActive={location === '/about'} onClick={closeMenu}>
                Tentang
              </NavLink>
              <NavLink href="/sports" isActive={location === '/sports'} onClick={closeMenu}>
                Cabang Olahraga
              </NavLink>
              <NavLink href="/events" isActive={location === '/events'} onClick={closeMenu}>
                Event
              </NavLink>
              <NavLink href="/news" isActive={location === '/news'} onClick={closeMenu}>
                Berita
              </NavLink>
              <NavLink href="/gallery" isActive={location === '/gallery'} onClick={closeMenu}>
                Galeri
              </NavLink>
              <NavLink href="/contact" isActive={location === '/contact'} onClick={closeMenu}>
                Kontak
              </NavLink>
              
              <hr className="border-gray-200" />
              
              <Link href="/join">
                <Button 
                  onClick={closeMenu}
                  className="font-poppins font-semibold text-sm bg-[#2E8B57] text-white px-4 py-2 rounded-full hover:bg-[#25704d] transition-colors self-start"
                >
                  Gabung Komunitas
                </Button>
              </Link>
              
              <div className="flex space-x-4 py-2">
                <button className="px-2 py-1 text-sm font-semibold text-[#333333] hover:text-[#2E8B57] transition-colors">ID</button>
                <span className="text-gray-300">|</span>
                <button className="px-2 py-1 text-sm font-semibold text-gray-400 hover:text-[#2E8B57] transition-colors">EN</button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
