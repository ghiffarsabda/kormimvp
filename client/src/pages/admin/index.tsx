import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Organization, News, Event, GalleryItem } from "@shared/schema";
import { Edit, Trash, Plus, Search } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/use-auth-admin";
import { apiRequest } from "@/lib/queryClient";
import NewsForm from "@/components/admin/news-form";

interface NewsFormState {
  mode: 'add' | 'edit';
  item?: News;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewsForm, setShowNewsForm] = useState<NewsFormState | null>(null);
  const { logout } = useAdminAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Delete news mutation
  const deleteNewsMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/news/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/news'] });
      toast({
        title: "Berita berhasil dihapus",
        description: "Berita telah dihapus dari database",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan",
        description: `Gagal menghapus berita. ${error.message}`,
      });
    }
  });

  const handleDeleteNews = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      deleteNewsMutation.mutate(id);
    }
  };

  const { data: organizations } = useQuery({
    queryKey: ['/api/organizations'],
  });

  const { data: news } = useQuery({
    queryKey: ['/api/news'],
  });

  const { data: events } = useQuery({
    queryKey: ['/api/events'],
  });

  const { data: gallery } = useQuery({
    queryKey: ['/api/gallery'],
  });
  
  // Filter news based on search term
  const filteredNews = news ? news.filter((item: News) => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Admin Navbar */}
      <div className="bg-[#2E8B57] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-poppins font-bold text-xl">KORMI Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <a className="text-white hover:text-white/80 transition-colors">
                Lihat Website
              </a>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-white">Admin</span>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white text-white hover:bg-white hover:text-[#2E8B57]"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-poppins font-bold text-2xl mb-2">KORMI Kota Bandung - Admin Dashboard</h1>
          <p className="font-nunito text-gray-600">
            Kelola konten website KORMI Kota Bandung
          </p>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className={`cursor-pointer ${activeTab === "overview" ? "border-[#2E8B57]" : ""}`}
            onClick={() => handleTabChange("overview")}
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium font-nunito">Dashboard</p>
              <h3 className="text-2xl font-bold font-poppins mt-1">Overview</h3>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer ${activeTab === "organizations" ? "border-[#2E8B57]" : ""}`}
            onClick={() => handleTabChange("organizations")}
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium font-nunito">Komunitas</p>
              <h3 className="text-2xl font-bold font-poppins mt-1">{organizations?.length || 0}</h3>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer ${activeTab === "news" ? "border-[#2E8B57]" : ""}`}
            onClick={() => handleTabChange("news")}
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium font-nunito">Berita</p>
              <h3 className="text-2xl font-bold font-poppins mt-1">{news?.length || 0}</h3>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer ${activeTab === "events" ? "border-[#2E8B57]" : ""}`}
            onClick={() => handleTabChange("events")}
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium font-nunito">Event</p>
              <h3 className="text-2xl font-bold font-poppins mt-1">{events?.length || 0}</h3>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer ${activeTab === "gallery" ? "border-[#2E8B57]" : ""}`}
            onClick={() => handleTabChange("gallery")}
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium font-nunito">Galeri</p>
              <h3 className="text-2xl font-bold font-poppins mt-1">{gallery?.length || 0}</h3>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer ${activeTab === "messages" ? "border-[#2E8B57]" : ""}`}
            onClick={() => handleTabChange("messages")}
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium font-nunito">Pesan</p>
              <h3 className="text-2xl font-bold font-poppins mt-1">0</h3>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid grid-cols-6 h-auto p-1">
            <TabsTrigger value="overview" className="py-2 font-poppins">Overview</TabsTrigger>
            <TabsTrigger value="organizations" className="py-2 font-poppins">Komunitas</TabsTrigger>
            <TabsTrigger value="news" className="py-2 font-poppins">Berita</TabsTrigger>
            <TabsTrigger value="events" className="py-2 font-poppins">Event</TabsTrigger>
            <TabsTrigger value="gallery" className="py-2 font-poppins">Galeri</TabsTrigger>
            <TabsTrigger value="messages" className="py-2 font-poppins">Pesan/Join</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                  <CardDescription>Update dan aktivitas terbaru di website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {news && news.length > 0 ? (
                      news.slice(0, 3).map((newsItem: News) => (
                        <div key={newsItem.id} className="flex items-start border-b pb-3">
                          <div className="w-10 h-10 rounded-full bg-[#4A90E2]/10 flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-[#4A90E2] font-semibold">N</span>
                          </div>
                          <div>
                            <h4 className="font-poppins font-semibold">{newsItem.title}</h4>
                            <p className="text-sm text-gray-500">Berita baru ditambahkan</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Tidak ada aktivitas terbaru</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Tindakan Cepat</CardTitle>
                  <CardDescription>Tindakan yang sering dilakukan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="flex justify-start items-center gap-2 h-auto py-3"
                      onClick={() => handleTabChange("news")}
                    >
                      <Plus className="h-4 w-4" /> Tambah Berita
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex justify-start items-center gap-2 h-auto py-3"
                      onClick={() => handleTabChange("events")}
                    >
                      <Plus className="h-4 w-4" /> Tambah Event
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex justify-start items-center gap-2 h-auto py-3"
                      onClick={() => handleTabChange("organizations")}
                    >
                      <Plus className="h-4 w-4" /> Tambah Komunitas
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex justify-start items-center gap-2 h-auto py-3"
                      onClick={() => handleTabChange("gallery")}
                    >
                      <Plus className="h-4 w-4" /> Tambah Galeri
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="organizations">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manajemen Komunitas</CardTitle>
                  <CardDescription>Kelola komunitas olahraga rekreasi</CardDescription>
                </div>
                <Button className="bg-[#2E8B57] hover:bg-[#25704d]">
                  <Plus className="h-4 w-4 mr-2" /> Tambah Komunitas
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2">
                  <Input placeholder="Cari komunitas..." className="max-w-sm" />
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" /> Cari
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 font-poppins font-semibold">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-3">Nama</div>
                    <div className="col-span-2">Kategori</div>
                    <div className="col-span-2">Lokasi</div>
                    <div className="col-span-2">Kontak</div>
                    <div className="col-span-2">Tindakan</div>
                  </div>
                  
                  {organizations && organizations.length > 0 ? (
                    organizations.map((org: Organization) => (
                      <div key={org.id} className="grid grid-cols-12 gap-4 p-3 border-t">
                        <div className="col-span-1">{org.id}</div>
                        <div className="col-span-3 font-semibold">{org.name}</div>
                        <div className="col-span-2">{org.sportCategoryId}</div>
                        <div className="col-span-2">{org.location}</div>
                        <div className="col-span-2">{org.contact}</div>
                        <div className="col-span-2 flex gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Tidak ada data komunitas
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="news">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manajemen Berita</CardTitle>
                  <CardDescription>Kelola berita dan artikel</CardDescription>
                </div>
                <Button 
                  className="bg-[#2E8B57] hover:bg-[#25704d]"
                  onClick={() => setShowNewsForm({ mode: 'add' })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Tambah Berita
                </Button>
              </CardHeader>
              <CardContent>
                {showNewsForm ? (
                  <NewsForm 
                    newsItem={showNewsForm.mode === 'edit' ? showNewsForm.item : undefined}
                    onCancel={() => setShowNewsForm(null)}
                    onSuccess={() => {
                      setShowNewsForm(null);
                      toast({
                        title: showNewsForm.mode === 'edit' ? "Berita berhasil diperbarui" : "Berita berhasil ditambahkan",
                        description: "Perubahan telah disimpan.",
                      });
                    }}
                  />
                ) : (
                  <>
                    <div className="mb-4 flex gap-2">
                      <Input 
                        placeholder="Cari berita..." 
                        className="max-w-sm" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button variant="outline">
                        <Search className="h-4 w-4 mr-2" /> Cari
                      </Button>
                    </div>
                    
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 font-poppins font-semibold">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-4">Judul</div>
                        <div className="col-span-2">Kategori</div>
                        <div className="col-span-3">Tanggal</div>
                        <div className="col-span-2">Tindakan</div>
                      </div>
                      
                      {news && news.length > 0 ? (
                        filteredNews.map((item: News) => (
                          <div key={item.id} className="grid grid-cols-12 gap-4 p-3 border-t">
                            <div className="col-span-1">{item.id}</div>
                            <div className="col-span-4 font-semibold">{item.title}</div>
                            <div className="col-span-2">{item.category}</div>
                            <div className="col-span-3">{new Date(item.date).toLocaleDateString('id-ID')}</div>
                            <div className="col-span-2 flex gap-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => setShowNewsForm({ mode: 'edit', item })}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteNews(item.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          Tidak ada data berita
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manajemen Event</CardTitle>
                  <CardDescription>Kelola event dan kegiatan</CardDescription>
                </div>
                <Button className="bg-[#2E8B57] hover:bg-[#25704d]">
                  <Plus className="h-4 w-4 mr-2" /> Tambah Event
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2">
                  <Input placeholder="Cari event..." className="max-w-sm" />
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" /> Cari
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 font-poppins font-semibold">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-3">Judul</div>
                    <div className="col-span-2">Tanggal</div>
                    <div className="col-span-2">Waktu</div>
                    <div className="col-span-2">Lokasi</div>
                    <div className="col-span-2">Tindakan</div>
                  </div>
                  
                  {events && events.length > 0 ? (
                    events.map((event: Event) => (
                      <div key={event.id} className="grid grid-cols-12 gap-4 p-3 border-t">
                        <div className="col-span-1">{event.id}</div>
                        <div className="col-span-3 font-semibold">{event.title}</div>
                        <div className="col-span-2">{new Date(event.date).toLocaleDateString('id-ID')}</div>
                        <div className="col-span-2">{event.time}</div>
                        <div className="col-span-2">{event.location}</div>
                        <div className="col-span-2 flex gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Tidak ada data event
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manajemen Galeri</CardTitle>
                  <CardDescription>Kelola foto dan video</CardDescription>
                </div>
                <Button className="bg-[#2E8B57] hover:bg-[#25704d]">
                  <Plus className="h-4 w-4 mr-2" /> Tambah Galeri
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2">
                  <Input placeholder="Cari galeri..." className="max-w-sm" />
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" /> Cari
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gallery && gallery.length > 0 ? (
                    gallery.map((item: GalleryItem) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-poppins font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 text-red-500 hover:text-red-700">
                              <Trash className="h-4 w-4 mr-2" /> Hapus
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-3 p-4 text-center text-gray-500">
                      Tidak ada data galeri
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Tabs defaultValue="messages" className="w-full">
              <TabsList>
                <TabsTrigger value="messages">Pesan Kontak</TabsTrigger>
                <TabsTrigger value="join-requests">Permintaan Gabung</TabsTrigger>
              </TabsList>
              
              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Pesan Kontak</CardTitle>
                    <CardDescription>Pesan dari pengunjung website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 text-center text-gray-500">
                      Tidak ada pesan kontak
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="join-requests">
                <Card>
                  <CardHeader>
                    <CardTitle>Permintaan Gabung</CardTitle>
                    <CardDescription>Permintaan untuk bergabung dengan komunitas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 text-center text-gray-500">
                      Tidak ada permintaan gabung
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;