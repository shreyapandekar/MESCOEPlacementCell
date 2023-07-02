const mongoose = require("mongoose");

mongoose
  .connect(
    // "mongodb+srv://Aak1112004:Aak1112004@cluster0.tft820e.mongodb.net/placementCell?retryWrites=true&w=majority",
    // "mongodb+srv://pandekarshreya:Shree@11@cluster1.ogd5fcb.mongodb.net/?retryWrites=true&w=majority",
    "mongodb+srv://pandekarshreya:Shree11@cluster1.ogd5fcb.mongodb.net/placement?retryWrites=true&w=majority",
    
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex:true
    }
  )
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((e) => {
    console.log(`No connection`);
  });
