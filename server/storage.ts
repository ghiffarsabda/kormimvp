import { 
  users, type User, type InsertUser,
  sportCategories, type SportCategory, type InsertSportCategory,
  organizations, type Organization, type InsertOrganization,
  events, type Event, type InsertEvent,
  news, type News, type InsertNews,
  galleryItems, type GalleryItem, type InsertGalleryItem,
  messages, type Message, type InsertMessage,
  joinRequests, type JoinRequest, type InsertJoinRequest
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Sport Categories
  getSportCategory(id: number): Promise<SportCategory | undefined>;
  getAllSportCategories(): Promise<SportCategory[]>;
  createSportCategory(category: InsertSportCategory): Promise<SportCategory>;
  updateSportCategory(id: number, category: InsertSportCategory): Promise<SportCategory>;
  deleteSportCategory(id: number): Promise<void>;
  
  // Organizations
  getOrganization(id: number): Promise<Organization | undefined>;
  getAllOrganizations(): Promise<Organization[]>;
  getOrganizationsByType(isOkb: boolean): Promise<Organization[]>;
  getOrganizationsByCategoryId(categoryId: number): Promise<Organization[]>;
  createOrganization(organization: InsertOrganization): Promise<Organization>;
  updateOrganization(id: number, organization: InsertOrganization): Promise<Organization>;
  deleteOrganization(id: number): Promise<void>;
  
  // Events
  getEvent(id: number): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: InsertEvent): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
  
  // News
  getNews(id: number): Promise<News | undefined>;
  getAllNews(): Promise<News[]>;
  createNews(newsItem: InsertNews): Promise<News>;
  updateNews(id: number, newsItem: InsertNews): Promise<News>;
  deleteNews(id: number): Promise<void>;
  
  // Gallery
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
  createGalleryItem(galleryItem: InsertGalleryItem): Promise<GalleryItem>;
  
  // Messages
  getMessage(id: number): Promise<Message | undefined>;
  getAllMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Join Requests
  getJoinRequest(id: number): Promise<JoinRequest | undefined>;
  getAllJoinRequests(): Promise<JoinRequest[]>;
  createJoinRequest(joinRequest: InsertJoinRequest): Promise<JoinRequest>;
  
  // Initialization
  initializeData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private sportCategories: Map<number, SportCategory>;
  private organizations: Map<number, Organization>;
  private events: Map<number, Event>;
  private newsItems: Map<number, News>;
  private galleryItems: Map<number, GalleryItem>;
  private messages: Map<number, Message>;
  private joinRequests: Map<number, JoinRequest>;
  
  private userCurrentId: number;
  private sportCategoryCurrentId: number;
  private organizationCurrentId: number;
  private eventCurrentId: number;
  private newsCurrentId: number;
  private galleryItemCurrentId: number;
  private messageCurrentId: number;
  private joinRequestCurrentId: number;

  constructor() {
    this.users = new Map();
    this.sportCategories = new Map();
    this.organizations = new Map();
    this.events = new Map();
    this.newsItems = new Map();
    this.galleryItems = new Map();
    this.messages = new Map();
    this.joinRequests = new Map();
    
    this.userCurrentId = 1;
    this.sportCategoryCurrentId = 1;
    this.organizationCurrentId = 1;
    this.eventCurrentId = 1;
    this.newsCurrentId = 1;
    this.galleryItemCurrentId = 1;
    this.messageCurrentId = 1;
    this.joinRequestCurrentId = 1;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Sport Categories
  async getSportCategory(id: number): Promise<SportCategory | undefined> {
    return this.sportCategories.get(id);
  }
  
  async getAllSportCategories(): Promise<SportCategory[]> {
    return Array.from(this.sportCategories.values());
  }
  
  async updateSportCategory(id: number, insertCategory: InsertSportCategory): Promise<SportCategory> {
    const category = this.sportCategories.get(id);
    if (!category) {
      throw new Error(`Sport category with id ${id} not found`);
    }
    
    const updatedCategory: SportCategory = { ...insertCategory, id };
    this.sportCategories.set(id, updatedCategory);
    return updatedCategory;
  }
  
  async deleteSportCategory(id: number): Promise<void> {
    const exists = this.sportCategories.has(id);
    if (!exists) {
      throw new Error(`Sport category with id ${id} not found`);
    }
    this.sportCategories.delete(id);
  }
  
  async createSportCategory(insertCategory: InsertSportCategory): Promise<SportCategory> {
    const id = this.sportCategoryCurrentId++;
    const category: SportCategory = { ...insertCategory, id };
    this.sportCategories.set(id, category);
    return category;
  }
  
  // Organizations
  async getOrganization(id: number): Promise<Organization | undefined> {
    return this.organizations.get(id);
  }
  
  async getAllOrganizations(): Promise<Organization[]> {
    return Array.from(this.organizations.values());
  }
  
  async getOrganizationsByType(isOkb: boolean): Promise<Organization[]> {
    return Array.from(this.organizations.values()).filter(org => org.isOkb === isOkb);
  }
  
  async getOrganizationsByCategoryId(categoryId: number): Promise<Organization[]> {
    return Array.from(this.organizations.values()).filter(org => org.sportCategoryId === categoryId);
  }
  
  async createOrganization(insertOrganization: InsertOrganization): Promise<Organization> {
    const id = this.organizationCurrentId++;
    // Ensure isOkb is always boolean
    const organization: Organization = { 
      ...insertOrganization, 
      id,
      isOkb: insertOrganization.isOkb === undefined ? false : insertOrganization.isOkb
    };
    this.organizations.set(id, organization);
    return organization;
  }
  
  async updateOrganization(id: number, insertOrganization: InsertOrganization): Promise<Organization> {
    const organization = this.organizations.get(id);
    if (!organization) {
      throw new Error(`Organization with id ${id} not found`);
    }
    
    const updatedOrganization: Organization = { 
      ...insertOrganization, 
      id,
      isOkb: insertOrganization.isOkb === undefined ? false : insertOrganization.isOkb 
    };
    this.organizations.set(id, updatedOrganization);
    return updatedOrganization;
  }
  
  async deleteOrganization(id: number): Promise<void> {
    const exists = this.organizations.has(id);
    if (!exists) {
      throw new Error(`Organization with id ${id} not found`);
    }
    this.organizations.delete(id);
  }
  
  // Events
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventCurrentId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }
  
  async updateEvent(id: number, insertEvent: InsertEvent): Promise<Event> {
    const event = this.events.get(id);
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    
    const updatedEvent: Event = { ...insertEvent, id };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }
  
  async deleteEvent(id: number): Promise<void> {
    const exists = this.events.has(id);
    if (!exists) {
      throw new Error(`Event with id ${id} not found`);
    }
    this.events.delete(id);
  }
  
  // News
  async getNews(id: number): Promise<News | undefined> {
    return this.newsItems.get(id);
  }
  
  async getAllNews(): Promise<News[]> {
    return Array.from(this.newsItems.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  
  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.newsCurrentId++;
    const newsItem: News = { ...insertNews, id };
    this.newsItems.set(id, newsItem);
    return newsItem;
  }
  
  async updateNews(id: number, newsItem: InsertNews): Promise<News> {
    const existingNews = await this.getNews(id);
    if (!existingNews) {
      throw new Error(`News with id ${id} not found`);
    }
    
    const updatedNews: News = { ...newsItem, id };
    this.newsItems.set(id, updatedNews);
    return updatedNews;
  }
  
  async deleteNews(id: number): Promise<void> {
    const existingNews = await this.getNews(id);
    if (!existingNews) {
      throw new Error(`News with id ${id} not found`);
    }
    
    this.newsItems.delete(id);
  }
  
  // Gallery
  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }
  
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }
  
  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  async createGalleryItem(insertGalleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.galleryItemCurrentId++;
    const galleryItem: GalleryItem = { ...insertGalleryItem, id };
    this.galleryItems.set(id, galleryItem);
    return galleryItem;
  }
  
  async updateGalleryItem(id: number, insertGalleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const galleryItem = this.galleryItems.get(id);
    if (!galleryItem) {
      throw new Error(`Gallery item with id ${id} not found`);
    }
    
    const updatedGalleryItem: GalleryItem = { ...insertGalleryItem, id };
    this.galleryItems.set(id, updatedGalleryItem);
    return updatedGalleryItem;
  }
  
  async deleteGalleryItem(id: number): Promise<void> {
    const exists = this.galleryItems.has(id);
    if (!exists) {
      throw new Error(`Gallery item with id ${id} not found`);
    }
    this.galleryItems.delete(id);
  }
  
  // Messages
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }
  
  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageCurrentId++;
    const message: Message = { ...insertMessage, id, createdAt: new Date() };
    this.messages.set(id, message);
    return message;
  }
  
  async updateMessage(id: number, insertMessage: InsertMessage): Promise<Message> {
    const message = this.messages.get(id);
    if (!message) {
      throw new Error(`Message with id ${id} not found`);
    }
    
    const updatedMessage: Message = { 
      ...insertMessage, 
      id, 
      createdAt: message.createdAt 
    };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }
  
  async deleteMessage(id: number): Promise<void> {
    const exists = this.messages.has(id);
    if (!exists) {
      throw new Error(`Message with id ${id} not found`);
    }
    this.messages.delete(id);
  }
  
  // Join Requests
  async getJoinRequest(id: number): Promise<JoinRequest | undefined> {
    return this.joinRequests.get(id);
  }
  
  async getAllJoinRequests(): Promise<JoinRequest[]> {
    return Array.from(this.joinRequests.values());
  }
  
  async createJoinRequest(insertJoinRequest: InsertJoinRequest): Promise<JoinRequest> {
    const id = this.joinRequestCurrentId++;
    const joinRequest: JoinRequest = { 
      ...insertJoinRequest, 
      id, 
      createdAt: new Date(),
      // Ensure message is always string | null, not undefined
      message: insertJoinRequest.message === undefined ? null : insertJoinRequest.message 
    };
    this.joinRequests.set(id, joinRequest);
    return joinRequest;
  }
  
  // Initialize sample data
  async initializeData(): Promise<void> {
    // Sport Categories
    const categories = [
      { name: "Lari" },
      { name: "Sepeda" },
      { name: "Senam" },
      { name: "Yoga" },
      { name: "Hiking" },
      { name: "Renang" },
      { name: "Pingpong" }
    ];
    
    const categoryMap = new Map<string, number>();
    
    for (const category of categories) {
      const newCategory = await this.createSportCategory(category);
      categoryMap.set(category.name, newCategory.id);
    }
    
    // Organizations
    const organizations = [
      {
        name: "Bandung Bike Community",
        sportCategoryId: categoryMap.get("Sepeda") || 2,
        isOkb: true,
        location: "Taman Lansia, Bandung",
        schedule: "Minggu, 06:00 WIB",
        contact: "0812-3456-7890",
        icon: "bicycle"
      },
      {
        name: "Bandung Runners",
        sportCategoryId: categoryMap.get("Lari") || 1,
        isOkb: true,
        location: "Track Stadion Siliwangi",
        schedule: "Sabtu & Minggu, 05:30 WIB",
        contact: "0877-8765-4321",
        icon: "running"
      },
      {
        name: "Yoga for Everyone",
        sportCategoryId: categoryMap.get("Yoga") || 4,
        isOkb: true,
        location: "Taman Film, Bandung",
        schedule: "Sabtu, 07:00 WIB",
        contact: "0856-7890-1234",
        icon: "spa"
      },
      {
        name: "Bandung Hiking Society",
        sportCategoryId: categoryMap.get("Hiking") || 5,
        isOkb: false,
        location: "Bervariasi (Tangkuban Perahu, Manglayang)",
        schedule: "Satu bulan sekali",
        contact: "0822-1234-5678",
        icon: "hiking"
      },
      {
        name: "Bandung Pingpong Club",
        sportCategoryId: categoryMap.get("Pingpong") || 7,
        isOkb: false,
        location: "GOR Saparua, Bandung",
        schedule: "Rabu & Jumat, 18:00 WIB",
        contact: "0813-2345-6789",
        icon: "table-tennis"
      },
      {
        name: "Bandung Swimming Community",
        sportCategoryId: categoryMap.get("Renang") || 6,
        isOkb: true,
        location: "Kolam Renang UPI, Bandung",
        schedule: "Minggu, 07:00 WIB",
        contact: "0878-9012-3456",
        icon: "swimmer"
      }
    ];
    
    for (const org of organizations) {
      await this.createOrganization(org);
    }
    
    // Events
    const events = [
      {
        title: "Bandung Fun Run 2023",
        date: "2023-11-25",
        location: "Taman Tegallega, Bandung",
        time: "07:00 - 11:00 WIB",
        fee: "Gratis",
        imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
      },
      {
        title: "Bandung Sport Festival",
        date: "2023-12-10",
        location: "Lapangan Gasibu, Bandung",
        time: "08:00 - 17:00 WIB",
        fee: "Rp 75.000",
        imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef3"
      },
      {
        title: "Yoga di Taman",
        date: "2023-12-15",
        location: "Taman Film, Bandung",
        time: "06:00 - 08:00 WIB",
        fee: "Gratis",
        imageUrl: "https://images.unsplash.com/photo-1565992441121-4367c2967103"
      }
    ];
    
    for (const event of events) {
      await this.createEvent(event);
    }
    
    // News
    const newsItems = [
      {
        title: "Festival Olahraga Rekreasi Kota Bandung 2023 Sukses Digelar",
        date: "2023-10-15",
        category: "Event",
        content: "Festival Olahraga Rekreasi Kota Bandung 2023 yang diselenggarakan KORMI Kota Bandung sukses menarik ribuan peserta dari berbagai komunitas olahraga.",
        excerpt: "Festival Olahraga Rekreasi Kota Bandung 2023 yang diselenggarakan KORMI Kota Bandung sukses menarik ribuan peserta dari berbagai komunitas olahraga.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
      },
      {
        title: "5 Manfaat Olahraga Rekreasi untuk Kesehatan Mental",
        date: "2023-10-10",
        category: "Artikel",
        content: "Olahraga rekreasi terbukti tidak hanya bermanfaat untuk kesehatan fisik, tetapi juga memiliki dampak positif terhadap kesehatan mental.",
        excerpt: "Olahraga rekreasi terbukti tidak hanya bermanfaat untuk kesehatan fisik, tetapi juga memiliki dampak positif terhadap kesehatan mental.",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306"
      },
      {
        title: "Bandung Bike Community: Pedal untuk Lingkungan",
        date: "2023-10-08",
        category: "Komunitas",
        content: "Bandung Bike Community bukan hanya komunitas bersepeda, tetapi juga aktif dalam kegiatan peduli lingkungan di Kota Bandung.",
        excerpt: "Bandung Bike Community bukan hanya komunitas bersepeda, tetapi juga aktif dalam kegiatan peduli lingkungan di Kota Bandung.",
        imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77"
      },
      {
        title: "Yoga di Taman Kota: Menyatu dengan Alam",
        date: "2023-10-05",
        category: "Event",
        content: "Kegiatan Yoga di Taman Kota yang diinisiasi KORMI Bandung bersama komunitas yoga lokal telah menjadi rutinitas mingguan yang populer.",
        excerpt: "Kegiatan Yoga di Taman Kota yang diinisiasi KORMI Bandung bersama komunitas yoga lokal telah menjadi rutinitas mingguan yang populer.",
        imageUrl: "https://images.unsplash.com/photo-1516939884455-1445c8652f83"
      },
      {
        title: "5 Spot Terbaik untuk Lari Pagi di Bandung",
        date: "2023-10-01",
        category: "Artikel",
        content: "Bandung memiliki beragam lokasi yang cocok untuk aktivitas lari pagi. Berikut 5 spot terbaik yang direkomendasikan para pelari lokal.",
        excerpt: "Bandung memiliki beragam lokasi yang cocok untuk aktivitas lari pagi. Berikut 5 spot terbaik yang direkomendasikan para pelari lokal.",
        imageUrl: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4"
      }
    ];
    
    for (const item of newsItems) {
      await this.createNews(item);
    }
    
    // Gallery Items
    const galleryItems = [
      {
        title: "Festival Olahraga 2023",
        category: "Event",
        imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
      },
      {
        title: "Yoga di Taman Film",
        category: "Komunitas",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
      },
      {
        title: "Bandung Bike Community",
        category: "Komunitas",
        imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77"
      },
      {
        title: "Bandung Runners",
        category: "Komunitas",
        imageUrl: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4"
      },
      {
        title: "Turnamen Antar Komunitas",
        category: "Event",
        imageUrl: "https://images.unsplash.com/photo-1574271143515-5cddf8da19be"
      },
      {
        title: "Yoga for Everyone",
        category: "Komunitas",
        imageUrl: "https://images.unsplash.com/photo-1565992441121-4367c2967103"
      },
      {
        title: "Pelatihan Pelatih Rekreasi",
        category: "Pelatihan",
        imageUrl: "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b"
      },
      {
        title: "Bandung Pingpong Club",
        category: "Komunitas",
        imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef3"
      }
    ];
    
    for (const item of galleryItems) {
      await this.createGalleryItem(item);
    }
  }
}

export const storage = new MemStorage();
