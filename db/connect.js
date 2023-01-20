import mongoose from "mongoose";

const dbConnection = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db...");
  } catch (err) {
    console.log(err);
  }
};

export { dbConnection };
