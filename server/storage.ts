import { IStorage } from "./storage";
import { User, Message, Symptom, InsertUser, InsertMessage, InsertSymptom } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveMessage(message: InsertMessage & { userId: number, timestamp: string }): Promise<Message>;
  getMessagesByUser(userId: number): Promise<Message[]>;
  saveSymptom(symptom: InsertSymptom & { userId: number, timestamp: string }): Promise<Symptom>;
  getSymptomsByUser(userId: number): Promise<Symptom[]>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private symptoms: Map<number, Symptom>;
  private currentUserId: number;
  private currentMessageId: number;
  private currentSymptomId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.symptoms = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.currentSymptomId = 1;
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

  async saveSymptom(symptom: InsertSymptom & { userId: number, timestamp: string }): Promise<Symptom> {
    const id = this.currentSymptomId++;
    const newSymptom: Symptom = { ...symptom, id };
    this.symptoms.set(id, newSymptom);
    return newSymptom;
  }

  async getSymptomsByUser(userId: number): Promise<Symptom[]> {
    return Array.from(this.symptoms.values())
      .filter(symptom => symptom.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
}

export const storage = new MemStorage();