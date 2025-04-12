import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { SportCategory, insertJoinRequestSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  MapPin, 
  Calendar, 
  Phone, 
  Info, 
  CheckCircle2
} from "lucide-react";

// Extended validation schema
const joinFormSchema = insertJoinRequestSchema.extend({
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(10, "Nomor telepon minimal 10 karakter"),
});

type JoinFormValues = z.infer<typeof joinFormSchema>;

const JoinPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const { data: categories, isLoading } = useQuery({
    queryKey: ['/api/sport-categories'],
  });
  
  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      sportCategoryId: 0,
      message: ""
    }
  });

  const onSubmit = async (data: JoinFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/join", {
        ...data,
        sportCategoryId: Number(data.sportCategoryId)
      });
      toast({
        title: "Permintaan Berhasil Dikirim",
        description: "Terima kasih telah mendaftar! Kami akan menghubungi Anda segera.",
        variant: "default",
      });
      form.reset();
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast({
        title: "Gagal Mengirim Permintaan",
        description: "Terjadi kesalahan saat mengirim permintaan. Silakan coba lagi nanti.",
        variant: "destructive",
      });
      console.error("Error submitting join request:", error);
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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517649763962-0c623066013b')" }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">Gabung Komunitas</h1>
            <p className="font-nunito text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Bergabunglah dengan komunitas olahraga rekreasi di Kota Bandung untuk gaya hidup aktif dan sehat
            </p>
          </div>
        </div>
      </section>
      
      {/* Success Message */}
      {isSuccess && (
        <div className="py-8 bg-[#F5F7FA]">
          <div className="container mx-auto px-4">
            <Card className="border-[#2E8B57]/20 bg-[#2E8B57]/5">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-[#2E8B57]/10 rounded-full p-2 mr-4">
                    <CheckCircle2 className="h-6 w-6 text-[#2E8B57]" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-lg mb-2 text-[#2E8B57]">
                      Permintaan Berhasil Dikirim!
                    </h3>
                    <p className="font-nunito text-gray-700">
                      Terima kasih telah mendaftar untuk bergabung dengan komunitas olahraga KORMI Kota Bandung.
                      Tim kami akan meninjau permintaan Anda dan menghubungi Anda melalui email atau telepon
                      yang telah diberikan dalam waktu 2-3 hari kerja.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {/* Join Form Section */}
      <section className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle>Formulir Pendaftaran</CardTitle>
                  <CardDescription>
                    Lengkapi formulir di bawah ini untuk bergabung dengan komunitas olahraga yang Anda minati
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                              <Input placeholder="Masukkan nama lengkap Anda" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alamat Email</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Masukkan email Anda" 
                                  type="email" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nomor Telepon</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Cth: 081234567890" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="sportCategoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cabang Olahraga yang Diminati</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value.toString()}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih cabang olahraga" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {isLoading ? (
                                  <SelectItem value="loading" disabled>Memuat...</SelectItem>
                                ) : (
                                  categories?.map((category: SportCategory) => (
                                    <SelectItem 
                                      key={category.id} 
                                      value={category.id.toString()}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Pilih cabang olahraga yang ingin Anda ikuti
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pesan (opsional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Ceritakan tentang pengalaman atau minat Anda" 
                                rows={4} 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Berikan informasi tambahan tentang pengalaman atau minat Anda dalam olahraga yang dipilih
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-[#2E8B57] hover:bg-[#25704d]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            {/* Information */}
            <div className="lg:col-span-5">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mengapa Bergabung?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex">
                        <CheckCircle2 className="h-5 w-5 text-[#2E8B57] mr-3 flex-shrink-0 mt-0.5" />
                        <p className="font-nunito text-gray-700">
                          Menjadi bagian dari komunitas yang aktif dan sehat
                        </p>
                      </li>
                      <li className="flex">
                        <CheckCircle2 className="h-5 w-5 text-[#2E8B57] mr-3 flex-shrink-0 mt-0.5" />
                        <p className="font-nunito text-gray-700">
                          Kesempatan untuk berpartisipasi dalam berbagai kegiatan dan event olahraga
                        </p>
                      </li>
                      <li className="flex">
                        <CheckCircle2 className="h-5 w-5 text-[#2E8B57] mr-3 flex-shrink-0 mt-0.5" />
                        <p className="font-nunito text-gray-700">
                          Bertemu dengan orang-orang yang memiliki minat yang sama
                        </p>
                      </li>
                      <li className="flex">
                        <CheckCircle2 className="h-5 w-5 text-[#2E8B57] mr-3 flex-shrink-0 mt-0.5" />
                        <p className="font-nunito text-gray-700">
                          Mendapatkan informasi terbaru seputar kegiatan olahraga rekreasi
                        </p>
                      </li>
                      <li className="flex">
                        <CheckCircle2 className="h-5 w-5 text-[#2E8B57] mr-3 flex-shrink-0 mt-0.5" />
                        <p className="font-nunito text-gray-700">
                          Meningkatkan kualitas hidup dengan gaya hidup aktif dan sehat
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Komunitas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-[#4A90E2] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-poppins font-semibold text-sm">Keanggotaan</h3>
                          <p className="font-nunito text-gray-700 text-sm">
                            Terbuka untuk semua warga Kota Bandung dan sekitarnya
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-[#4A90E2] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-poppins font-semibold text-sm">Lokasi</h3>
                          <p className="font-nunito text-gray-700 text-sm">
                            Berbagai lokasi di Kota Bandung (tergantung komunitas)
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-[#4A90E2] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-poppins font-semibold text-sm">Jadwal</h3>
                          <p className="font-nunito text-gray-700 text-sm">
                            Bervariasi sesuai dengan jenis olahraga dan komunitas
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-[#4A90E2] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-poppins font-semibold text-sm">Persyaratan</h3>
                          <p className="font-nunito text-gray-700 text-sm">
                            Minat dan komitmen untuk berpartisipasi dalam kegiatan komunitas
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-[#4A90E2] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-poppins font-semibold text-sm">Kontak</h3>
                          <p className="font-nunito text-gray-700 text-sm">
                            info@kormikotabandung.id | +62 812 3456 7890
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="bg-[#FF7A45]/10 rounded-xl p-6">
                  <h3 className="font-poppins font-semibold text-[#FF7A45] mb-2">Perhatian</h3>
                  <p className="font-nunito text-gray-700 text-sm">
                    Setelah mengirimkan formulir pendaftaran, tim kami akan menghubungi Anda dalam 2-3 hari 
                    kerja untuk memberikan informasi lebih lanjut mengenai komunitas yang Anda minati.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Testimonials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-2xl mb-2">Testimoni Anggota Komunitas</h2>
            <p className="font-nunito text-gray-600 max-w-3xl mx-auto">
              Pengalaman dari anggota yang telah bergabung dengan komunitas olahraga KORMI Kota Bandung
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#4A90E2]/10 flex items-center justify-center mr-4">
                    <span className="font-poppins font-semibold text-[#4A90E2]">AS</span>
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold">Andi Suryadi</h3>
                    <p className="text-sm text-gray-500">Bandung Runners</p>
                  </div>
                </div>
                <p className="font-nunito text-gray-700">
                  "Bergabung dengan komunitas lari KORMI Bandung adalah keputusan terbaik saya. 
                  Saya mendapatkan teman-teman baru yang supportif dan jadwal lari yang teratur 
                  membuat gaya hidup saya lebih sehat."
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2E8B57]/10 flex items-center justify-center mr-4">
                    <span className="font-poppins font-semibold text-[#2E8B57]">DW</span>
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold">Dewi Wulandari</h3>
                    <p className="text-sm text-gray-500">Yoga for Everyone</p>
                  </div>
                </div>
                <p className="font-nunito text-gray-700">
                  "Sebagai pemula di yoga, saya sangat terbantu dengan komunitas yang inklusif ini. 
                  Instruktur sangat membantu dan suasana yang diciptakan membuat saya selalu semangat 
                  untuk hadir di setiap sesi."
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF7A45]/10 flex items-center justify-center mr-4">
                    <span className="font-poppins font-semibold text-[#FF7A45]">BP</span>
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold">Budi Pratama</h3>
                    <p className="text-sm text-gray-500">Bandung Bike Community</p>
                  </div>
                </div>
                <p className="font-nunito text-gray-700">
                  "Saya telah bergabung dengan komunitas sepeda selama 2 tahun dan pengalaman 
                  yang didapat sangat luar biasa. Selain bersepeda bersama, kami juga aktif 
                  dalam kegiatan sosial dan peduli lingkungan."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-2xl mb-2">Pertanyaan Umum</h2>
            <p className="font-nunito text-gray-600 max-w-3xl mx-auto">
              Jawaban atas pertanyaan yang sering diajukan seputar pendaftaran komunitas
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="mb-4">
              <CardContent className="p-6">
                <h3 className="font-poppins font-semibold text-lg mb-2">
                  Apakah ada biaya untuk bergabung dengan komunitas?
                </h3>
                <p className="font-nunito text-gray-700">
                  Kebanyakan komunitas tidak memungut biaya untuk bergabung. Namun, beberapa komunitas 
                  mungkin memiliki kontribusi bulanan untuk biaya operasional atau peralatan. Informasi 
                  mengenai biaya akan disampaikan setelah Anda mendaftar.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-4">
              <CardContent className="p-6">
                <h3 className="font-poppins font-semibold text-lg mb-2">
                  Apakah saya harus memiliki pengalaman untuk bergabung?
                </h3>
                <p className="font-nunito text-gray-700">
                  Tidak, sebagian besar komunitas terbuka untuk semua level, dari pemula hingga yang 
                  sudah berpengalaman. Komunitas olahraga rekreasi berfokus pada kesenangan dan 
                  kebersamaan, bukan pada kompetisi.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-4">
              <CardContent className="p-6">
                <h3 className="font-poppins font-semibold text-lg mb-2">
                  Berapa lama proses pendaftaran?
                </h3>
                <p className="font-nunito text-gray-700">
                  Setelah Anda mengirimkan formulir, tim kami akan meninjau dan menghubungi Anda 
                  dalam waktu 2-3 hari kerja. Proses selanjutnya tergantung pada komunitas yang 
                  Anda pilih.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-poppins font-semibold text-lg mb-2">
                  Apa saja yang perlu saya siapkan untuk bergabung?
                </h3>
                <p className="font-nunito text-gray-700">
                  Persiapkan minat dan komitmen untuk berpartisipasi dalam kegiatan komunitas. 
                  Peralatan dan perlengkapan olahraga dapat menyesuaikan setelah Anda mendapatkan 
                  informasi lebih lanjut dari koordinator komunitas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinPage;
