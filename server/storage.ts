import { IStorage } from "./storage";
import { User, Message, InsertUser, InsertMessage } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveMessage(message: InsertMessage & { userId: number, timestamp: string }): Promise<Message>;
  getMessagesByUser(userId: number): Promise<Message[]>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private currentUserId: number;
  private currentMessageId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveMessage(message: InsertMessage & { userId: number, timestamp: string }): Promise<Message> {
    const id = this.currentMessageId++;
    const newMessage: Message = { ...message, id };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async getMessagesByUser(userId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }
}

export const storage = new MemStorage();
