import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { dbName, mongoUrl } = options;

    try {
      const connection = await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });

      const url = `${connection.connection.host}: ${connection.connection.port}`;

      console.log(`Connection successfully with Mongo DataBase 🌐 ${url}`);
      return true;
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }
  }
}
