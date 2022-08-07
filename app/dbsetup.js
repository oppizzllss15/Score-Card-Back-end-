const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;
async function connectDB(){
    MongoMemoryServer.create().then((mongodbServer) => {
        mongoServer = mongodbServer;
        try{
          const uri = mongodbServer.getUri();
          const mongooseOptions = {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              
          }
          
          mongoose.connect(uri, mongooseOptions).then(() => {console.log("mongo started in-memory...")});
          
        
        }catch(e){console.log(e.message + " dDB ERROR")}
      })
}

async function disconnectDB(){
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop();
}
module.exports = {
    connectDB, disconnectDB
}