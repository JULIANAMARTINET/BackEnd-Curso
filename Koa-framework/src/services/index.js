import mongoose from "mongoose";
import { config } from "../config/index.js";

const init = async () => {
  try {
    if (config.SERVER.SELECTED_DATABASE !== "mongo") return;
    mongoose.connect(config.DATABASES.mongo.url, {
      dbName: config.DATABASES.mongo.dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });22
    console.log("🔑 Connection with mongodb established 📶");
  } catch (error) {
    console.error(error);
  }
};

const MongoDBService = {
  init,
};

export { MongoDBService };