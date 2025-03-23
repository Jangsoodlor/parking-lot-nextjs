import _mongoose, { connect } from "mongoose";


class MongoDBManager{
  private static readonly MONGODB_URI = process.env.MONGODB_URI;
  private static instance: MongoDBManager | null;
  private mongo_instance: {promise: ReturnType<typeof connect> | null, conn: typeof _mongoose | null;};

  private constructor() {
    if (!MongoDBManager.MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }
    this.mongo_instance = {promise: null, conn: null};
  }

  public static getInstance(): MongoDBManager{
    if(!MongoDBManager.instance) {
      MongoDBManager.instance = new MongoDBManager();
    }
    return MongoDBManager.instance
  }

  public async connect(): Promise<typeof _mongoose> {
    if (this.mongo_instance.conn) {
      return this.mongo_instance.conn;
    }
  
    if (!this.mongo_instance.promise) {
      const opts = {
        bufferCommands: false,
      };
  
      this.mongo_instance.promise = connect(MongoDBManager.MONGODB_URI!, opts).then((mongoose) => {
        return mongoose;
      });
    }

    try {
      this.mongo_instance.conn = await this.mongo_instance.promise;
    } catch (e) {
      this.mongo_instance.promise = null;
      throw e;
    }
  
    return this.mongo_instance.conn;
  }
}

export default MongoDBManager;
