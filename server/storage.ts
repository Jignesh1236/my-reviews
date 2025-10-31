
import { type Review, type InsertReview, reviewSchema } from "@shared/schema";
import { MongoClient, Db, Collection, ObjectId } from "mongodb";

const DATABASE_URL = "mongodb+srv://jigneshmaru690_db_user:Jignesh%40Maru@jignesh.sqbuwxq.mongodb.net/?appName=jignesh";

let db: Db;
let reviewsCollection: Collection;

async function initializeDb() {
  const client = new MongoClient(DATABASE_URL);
  await client.connect();
  db = client.db();
  reviewsCollection = db.collection("reviews");
  
  // Create index for sorting by date
  await reviewsCollection.createIndex({ date: -1 });
}

// Initialize database connection
initializeDb().catch(console.error);

export interface IStorage {
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MongoStorage implements IStorage {
  async getReviews(): Promise<Review[]> {
    const docs = await reviewsCollection
      .find()
      .sort({ date: -1 })
      .toArray();
    
    return docs.map(doc => ({
      _id: doc._id.toString(),
      name: doc.name,
      rating: doc.rating,
      review: doc.review,
      date: doc.date,
    }));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const result = await reviewsCollection.insertOne({
      ...insertReview,
      date: new Date(),
    });
    
    const newDoc = await reviewsCollection.findOne({ _id: result.insertedId });
    
    return {
      _id: newDoc!._id.toString(),
      name: newDoc!.name,
      rating: newDoc!.rating,
      review: newDoc!.review,
      date: newDoc!.date,
    };
  }
}

export const storage = new MongoStorage();
