import { CheckCircle, Users } from 'lucide-react';

const About = () => {
  return (
    <>
      {/* Header Banner */}
      <section className="relative bg-[#4A90E2] py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E8B57]/90 to-[#4A90E2]/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540539234-c14a20fb7c7b')" }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">Tentang KORMI Kota Bandung</h1>
            <p className="font-nunito text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Membangun masyarakat Bandung yang aktif, sehat, dan bahagia melalui olahraga rekreasi
            </p>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-20 h-1 bg-[#2E8B57] mb-6"></div>
              <h2 className="font-poppins font-bold text-3xl mb-6 text-[#333333]">Visi & Misi</h2>
              
              <div className="mb-8">
                <h3 className="font-poppins font-semibold text-xl mb-4 text-[#2E8B57]">Visi</h3>
                <p className="font-nunito text-gray-700 text-lg">
                  Mewujudkan masyarakat Kota Bandung yang aktif, sehat, dan bahagia melalui kegiatan olahraga rekreasi yang inklusif dan berkelanjutan.
                </p>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl mb-4 text-[#2E8B57]">Misi</h3>
                <ul className="font-nunito text-gray-700 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-[#2E8B57] mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>Memasyarakatkan olahraga rekreasi sebagai gaya hidup sehat dan aktif di Kota Bandung</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#2E8B57] mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>Memfasilitasi pengembangan komunitas dan organisasi olahraga rekreasi yang mandiri dan berkelanjutan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#2E8B57] mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>Menyelenggarakan event olahraga rekreasi yang inovatif, inklusif, dan berbasis masyarakat</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#2E8B57] mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>Meningkatkan partisipasi seluruh lapisan masyarakat dalam kegiatan olahraga rekreasi</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#2E8B57] mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>Berkolaborasi dengan pemerintah daerah dan stakeholder terkait untuk menciptakan ekosistem olahraga rekreasi yang kondusif</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" 
                alt="Kegiatan KORMI Kota Bandung" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* History */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-1 bg-[#2E8B57] mx-auto mb-6"></div>
            <h2 className="font-poppins font-bold text-3xl mb-4 text-[#333333]">Sejarah KORMI Kota Bandung</h2>
            <p className="font-nunito text-gray-600 max-w-3xl mx-auto">
              Perjalanan kami dalam mengembangkan olahraga rekreasi di Kota Bandung
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-[#2E8B57] pl-8 pb-12">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#2E8B57]"></div>
              <h3 className="font-poppins font-semibold text-xl mb-2 text-[#2E8B57]">2018 - Pendirian KORMI Kota Bandung</h3>
              <p className="font-nunito text-gray-700 mb-2">
                KORMI Kota Bandung didirikan sebagai implementasi dari PERPRES No. 86 Tahun 2017 tentang KORMI. Terbentuk untuk mengkoordinasikan dan mewadahi seluruh kegiatan olahraga rekreasi di Kota Bandung.
              </p>
            </div>
            
            <div className="relative border-l-2 border-[#2E8B57] pl-8 pb-12">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#2E8B57]"></div>
              <h3 className="font-poppins font-semibold text-xl mb-2 text-[#2E8B57]">2019 - Pembentukan Inorga</h3>
              <p className="font-nunito text-gray-700 mb-2">
                Mulai dilakukan pembentukan dan pendataan Induk Organisasi Olahraga Rekreasi (Inorga) yang berada di bawah naungan KORMI Kota Bandung.
              </p>
            </div>
            
            <div className="relative border-l-2 border-[#2E8B57] pl-8 pb-12">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#2E8B57]"></div>
              <h3 className="font-poppins font-semibold text-xl mb-2 text-[#2E8B57]">2020 - Adaptasi di Masa Pandemi</h3>
              <p className="font-nunito text-gray-700 mb-2">
                Mengadaptasi kegiatan olahraga rekreasi selama pandemi COVID-19 dengan menginisiasi program olahraga rekreasi virtual dan pedoman protokol kesehatan untuk kegiatan olahraga.
              </p>
            </div>
            
            <div className="relative border-l-2 border-[#2E8B57] pl-8 pb-12">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#2E8B57]"></div>
              <h3 className="font-poppins font-semibold text-xl mb-2 text-[#2E8B57]">2021 - Penguatan Kapasitas Organisasi</h3>
              <p className="font-nunito text-gray-700 mb-2">
                Fokus pada penguatan kapasitas organisasi dan pelatihan pengelolaan komunitas olahraga rekreasi bagi Inorga yang berada di bawah KORMI Kota Bandung.
              </p>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#2E8B57]"></div>
              <h3 className="font-poppins font-semibold text-xl mb-2 text-[#2E8B57]">2022 - Sekarang</h3>
              <p className="font-nunito text-gray-700 mb-2">
                KORMI Kota Bandung terus berkembang dengan menyelenggarakan berbagai event olahraga rekreasi dan mendukung pertumbuhan komunitas olahraga rekreasi di Kota Bandung.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Organizational Structure */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-1 bg-[#2E8B57] mx-auto mb-6"></div>
            <h2 className="font-poppins font-bold text-3xl mb-4 text-[#333333]">Struktur Organisasi</h2>
            <p className="font-nunito text-gray-600 max-w-3xl mx-auto">
              Pengurus KORMI Kota Bandung Periode 2022-2026
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-24 h-24 bg-[#4A90E2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#4A90E2] h-12 w-12" />
              </div>
              <h3 className="font-poppins font-semibold text-lg mb-1">Agus Supriatna</h3>
              <p className="font-nunito text-[#2E8B57] font-semibold">Ketua Umum</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-24 h-24 bg-[#4A90E2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#4A90E2] h-12 w-12" />
              </div>
              <h3 className="font-poppins font-semibold text-lg mb-1">Budi Santoso</h3>
              <p className="font-nunito text-[#2E8B57] font-semibold">Sekretaris Umum</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-24 h-24 bg-[#4A90E2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#4A90E2] h-12 w-12" />
              </div>
              <h3 className="font-poppins font-semibold text-lg mb-1">Dewi Lestari</h3>
              <p className="font-nunito text-[#2E8B57] font-semibold">Bendahara Umum</p>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="font-poppins font-semibold text-lg mb-3">Bidang Organisasi</h3>
              <p className="font-nunito text-gray-700">Koordinator: Rina Wijaya</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="font-poppins font-semibold text-lg mb-3">Bidang Pembinaan</h3>
              <p className="font-nunito text-gray-700">Koordinator: Deni Kurniawan</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="font-poppins font-semibold text-lg mb-3">Bidang Kompetisi</h3>
              <p className="font-nunito text-gray-700">Koordinator: Fauzi Rahman</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="font-poppins font-semibold text-lg mb-3">Bidang Hubungan Masyarakat</h3>
              <p className="font-nunito text-gray-700">Koordinator: Maya Putri</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
