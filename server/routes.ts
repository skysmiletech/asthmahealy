import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { openai } from "./openai";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.post("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const validation = insertMessageSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid message format" });
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [
          {
            role: "system",
            content: "You are a helpful medical assistant specializing in asthma care. Provide accurate, professional advice while making it clear you are an AI assistant and serious medical concerns should be directed to a healthcare provider."
          },
          {
            role: "user",
            content: req.body.content
          }
        ],
        max_tokens: 500
      });

      const botMessage = {
        content: response.choices[0].message.content,
        userId: req.user.id,
        isBot: true,
        timestamp: new Date().toISOString()
      };

      const userMessage = {
        content: req.body.content,
        userId: req.user.id,
        isBot: false,
        timestamp: new Date().toISOString()
      };

      await storage.saveMessage(userMessage);
      await storage.saveMessage(botMessage);

      res.json(botMessage);
    } catch (error) {
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  app.get("/api/messages", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const messages = await storage.getMessagesByUser(req.user.id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
