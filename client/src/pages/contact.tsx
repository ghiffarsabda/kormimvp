import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { insertMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube 
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { z } from "zod";

// Extended validation schema
const contactFormSchema = insertMessageSchema.extend({
  email: z.string().email("Email tidak valid"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Gagal Mengirim Pesan",
        description: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.",
        variant: "destructive",
      });
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header Banner */}
      <section className="relative bg-[#4A90E2] py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/90 to-[#4A90E2]/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533107862482-0e6974b06ec4')" }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">Kontak Kami</h1>
            <p className="font-nunito text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut atau kerjasama dengan KORMI Kota Bandung
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Content */}
      <section className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <Card className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="font-poppins font-semibold text-xl mb-6">Kirim Pesan</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-nunito font-semibold text-gray-700">
                            Nama Lengkap
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nama lengkap Anda" 
                              {...field} 
                              className="rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-nunito font-semibold text-gray-700">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Alamat email Anda" 
                              type="email" 
                              {...field} 
                              className="rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-nunito font-semibold text-gray-700">
                          Subjek
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Subjek pesan" 
                            {...field} 
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-nunito font-semibold text-gray-700">
                          Pesan
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tulis pesan Anda di sini" 
                            rows={4} 
                            {...field} 
                            className="rounded-lg resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto font-poppins font-semibold bg-[#2E8B57] text-white px-6 py-3 rounded-full hover:bg-[#25704d] transition-colors h-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>
              </Form>
            </Card>
            
            {/* Contact Information */}
            <div className="flex flex-col">
              <Card className="bg-white p-8 rounded-xl shadow-md mb-6">
                <h2 className="font-poppins font-semibold text-xl mb-6">Informasi Kontak</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#2E8B57]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="text-[#2E8B57] h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold mb-1">Alamat</h3>
                      <p className="font-nunito text-gray-600">Jl. Aceh No. 66, Bandung, Jawa Barat 40115</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#2E8B57]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="text-[#2E8B57] h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold mb-1">Email</h3>
                      <p className="font-nunito text-gray-600">info@kormikotabandung.id</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#2E8B57]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="text-[#2E8B57] h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold mb-1">Telepon</h3>
                      <p className="font-nunito text-gray-600">+62 22 7123456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#2E8B57]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <FaWhatsapp className="text-[#2E8B57] h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold mb-1">WhatsApp</h3>
                      <p className="font-nunito text-gray-600">+62 812 3456 7890</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-poppins font-semibold mb-3">Sosial Media</h3>
                  <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-[#2E8B57]/10 hover:bg-[#2E8B57]/20 flex items-center justify-center text-[#2E8B57] transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#2E8B57]/10 hover:bg-[#2E8B57]/20 flex items-center justify-center text-[#2E8B57] transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#2E8B57]/10 hover:bg-[#2E8B57]/20 flex items-center justify-center text-[#2E8B57] transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#2E8B57]/10 hover:bg-[#2E8B57]/20 flex items-center justify-center text-[#2E8B57] transition-colors">
                      <Youtube className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </Card>
              
              {/* Map */}
              <Card className="bg-white p-8 rounded-xl shadow-md flex-grow">
                <h2 className="font-poppins font-semibold text-xl mb-6">Lokasi Kami</h2>
                
                <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                  {/* Google Maps iframe - replace with actual map */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7980001772115!2d107.61316877428362!3d-6.911895093080115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63a58cc0617%3A0xd8b976a735b681f0!2sJl.%20Aceh%2C%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1706535896702!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="KORMI Kota Bandung location"
                  ></iframe>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-2xl mb-2">Pertanyaan yang Sering Diajukan</h2>
            <p className="font-nunito text-gray-600 max-w-3xl mx-auto">
              Beberapa pertanyaan yang sering diajukan tentang KORMI Kota Bandung
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y">
            <div className="py-6">
              <h3 className="font-poppins font-semibold text-lg mb-2">Apa itu KORMI Kota Bandung?</h3>
              <p className="font-nunito text-gray-600">
                KORMI Kota Bandung adalah Komite Olahraga Rekreasi Masyarakat Indonesia untuk wilayah Kota Bandung yang bertugas mengembangkan dan membina kegiatan olahraga rekreasi masyarakat.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="font-poppins font-semibold text-lg mb-2">Bagaimana cara bergabung dengan komunitas olahraga di bawah KORMI?</h3>
              <p className="font-nunito text-gray-600">
                Anda dapat menghubungi kami melalui formulir kontak atau langsung menghubungi komunitas olahraga yang diminati melalui halaman Cabang Olahraga di website ini.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="font-poppins font-semibold text-lg mb-2">Apakah semua kegiatan KORMI Kota Bandung berbayar?</h3>
              <p className="font-nunito text-gray-600">
                Tidak semua kegiatan berbayar. KORMI Kota Bandung memiliki berbagai kegiatan, baik yang gratis maupun berbayar. Informasi biaya partisipasi akan dicantumkan pada setiap pengumuman kegiatan.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="font-poppins font-semibold text-lg mb-2">Bagaimana cara mendaftarkan komunitas olahraga baru ke KORMI?</h3>
              <p className="font-nunito text-gray-600">
                Untuk mendaftarkan komunitas olahraga baru, Anda dapat mengisi formulir pendaftaran di halaman Gabung Komunitas atau menghubungi kami melalui email atau telepon untuk informasi lebih lanjut.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
