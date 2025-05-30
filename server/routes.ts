import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertSportCategorySchema,
  insertOrganizationSchema,
  insertEventSchema,
  insertNewsSchema,
  insertGalleryItemSchema,
  insertMessageSchema,
  insertJoinRequestSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sport Categories
  app.get("/api/sport-categories", async (req, res) => {
    const categories = await storage.getAllSportCategories();
    res.json(categories);
  });

  // Organizations
  app.get("/api/organizations", async (req, res) => {
    const { isOkb, categoryId } = req.query;
    
    let organizations;
    if (categoryId && !isNaN(Number(categoryId))) {
      organizations = await storage.getOrganizationsByCategoryId(Number(categoryId));
    } else if (isOkb !== undefined) {
      const isOkbValue = isOkb === 'true';
      organizations = await storage.getOrganizationsByType(isOkbValue);
    } else {
      organizations = await storage.getAllOrganizations();
    }
    
    res.json(organizations);
  });
  
  app.get("/api/organizations/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const organization = await storage.getOrganization(id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    
    res.json(organization);
  });
  
  app.post("/api/organizations", async (req, res) => {
    try {
      const data = insertOrganizationSchema.parse(req.body);
      const organization = await storage.createOrganization(data);
      res.status(201).json(organization);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create organization" });
    }
  });

  // Events
  app.get("/api/events", async (req, res) => {
    const events = await storage.getAllEvents();
    res.json(events);
  });
  
  app.get("/api/events/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const event = await storage.getEvent(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    res.json(event);
  });
  
  app.post("/api/events", async (req, res) => {
    try {
      const data = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(data);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  // News
  app.get("/api/news", async (req, res) => {
    const newsItems = await storage.getAllNews();
    res.json(newsItems);
  });
  
  app.get("/api/news/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const newsItem = await storage.getNews(id);
    if (!newsItem) {
      return res.status(404).json({ message: "News item not found" });
    }
    
    res.json(newsItem);
  });
  
  app.post("/api/news", async (req, res) => {
    try {
      const data = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNews(data);
      res.status(201).json(newsItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create news item" });
    }
  });
  
  app.patch("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      // Check if news item exists
      const existingNews = await storage.getNews(id);
      if (!existingNews) {
        return res.status(404).json({ message: "News item not found" });
      }
      
      // Validate and parse the request body
      const data = insertNewsSchema.parse(req.body);
      
      // Update the news item
      const updatedNews = await storage.updateNews(id, data);
      res.json(updatedNews);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to update news item" });
    }
  });
  
  app.delete("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      // Check if news item exists
      const existingNews = await storage.getNews(id);
      if (!existingNews) {
        return res.status(404).json({ message: "News item not found" });
      }
      
      // Delete the news item
      await storage.deleteNews(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete news item" });
    }
  });

  // Gallery
  app.get("/api/gallery", async (req, res) => {
    const { category } = req.query;
    
    let galleryItems;
    if (category && typeof category === 'string') {
      galleryItems = await storage.getGalleryItemsByCategory(category);
    } else {
      galleryItems = await storage.getAllGalleryItems();
    }
    
    res.json(galleryItems);
  });
  
  app.post("/api/gallery", async (req, res) => {
    try {
      const data = insertGalleryItemSchema.parse(req.body);
      const galleryItem = await storage.createGalleryItem(data);
      res.status(201).json(galleryItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create gallery item" });
    }
  });

  // Contact messages
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(data);
      res.status(201).json({ success: true, id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Join requests
  app.post("/api/join", async (req, res) => {
    try {
      const data = insertJoinRequestSchema.parse(req.body);
      const joinRequest = await storage.createJoinRequest(data);
      res.status(201).json({ success: true, id: joinRequest.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to submit join request" });
    }
  });

  // Add sample data for testing purposes
  app.post("/api/initialize-data", async (req, res) => {
    try {
      // Initialize sport categories
      await storage.initializeData();
      res.status(200).json({ success: true, message: "Data initialized successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to initialize data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
