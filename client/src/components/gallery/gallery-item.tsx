import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GalleryItem } from '@shared/schema';

interface GalleryItemProps {
  item: GalleryItem;
}

const GalleryItemComponent = ({ item }: GalleryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="relative group overflow-hidden rounded-lg h-40 md:h-56 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <p className="text-white font-poppins font-semibold">{item.title}</p>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="relative">
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white font-poppins font-semibold text-lg">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.category}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryItemComponent;
