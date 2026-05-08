/* 
const express=require("express");
const cors=require("cors");
const MongoClient=require("mongodb").MongoClient;

const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//const connectionString="mongodb://127.0.0.1:27017";

//mongodb+srv://sunil_nit:12345@sunil.tlsk3ml.mongodb.net/?appName=SUNIL;

const connectionString = "mongodb+srv://sunil_nit:12345@sunil.tlsk3ml.mongodb.net/youtubedb?retryWrites=true&w=majority&appName=SUNIL";
app.get('/admin',(req,res)=>{
    MongoClient.connect(connectionString)
    .then(clientObject=>{
        var database=clientObject.db("youtubedb");
        database.collection('admin').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})



app.get('/users',(req,res)=>{
    MongoClient.connect(connectionString)
    .then(clientObject=>{
        var database=clientObject.db("youtubedb");
        database.collection('users').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})


app.get('/categories',(req,res)=>{
    MongoClient.connect(connectionString)
    .then(clientObject=>{
        var database=clientObject.db("youtubedb");
        database.collection('categories').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})

app.get('/videos',(req,res)=>{
    MongoClient.connect(connectionString)
    .then(clientObject=>{
        var database=clientObject.db("youtubedb");
        database.collection('videos').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})

app.get('/videos/:id',(req,res)=>{
    MongoClient.connect(connectionString)
    .then(clientObject=>{
        var database=clientObject.db("youtubedb");
        database.collection('videos').findOne({video_id:parseInt(req.params.id)}).then(document=>{
            res.send(document);
            res.end();
        })
    })
})


app.post('/register_user',(req,res)=>{
   var user={
    user_id:req.body.user_id,
    user_name:req.body.user_name,
    password:req.body.password,
    email:req.body.email
   }
   MongoClient.connect(connectionString).then(clientObject=>{
    var database=clientObject.db("youtubedb");
    database.collection('users').insertOne(user)
    .then(()=>{
        console.log('User Register');
        res.end();
    })
   })

})

app.post('/admin',(req,res)=>{
         

    var admin={
        admin_id:req.body.admin_id,
        password:req.body.password
            }  
   MongoClient.connect(connectionString).then(clientObject=>{
        var database=clientObject.db("youtubedb");
        database.collection('admins').insertOne(admin)
        .then(()=>{
            console.log("Admin Added");
            console.log(admin_id);
            console.log(password);
            res.end();
        })  
    }) 
})


app.post('/add_video',(req,res)=>{
    var video={
        video_id:parseInt(req.body.video_id),
        title:req.body.title,
        url:req.body.url,
        description:req.body.description,
        likes:parseInt(req.body.likes),
        dislikes:parseInt(req.body.dislikes),
        views:parseInt(req.body.views),
        comments:req.body.comments,
        category_id:parseInt(req.body.category_id)
    }
    MongoClient.connect(connectionString).then(clientObject=>{
        var database=clientObject.db("youtubedb");
        database.collection('videos').insertOne(video)
        .then(()=>{
            console.log("Videos Added");
            res.end();
        })
    })
    
})

app.put('/videos/:id',(req,res)=>{
    var video={
        video_id:parseInt(req.body.video_id),
        title:req.body.title,
        url:req.body.url,
        description:req.body.description,
        likes:parseInt(req.body.likes),
        dislikes:parseInt(req.body.dislikes),
        views:parseInt(req.body.views),
        comments:req.body.comments,
        category_id:parseInt(req.body.category_id)
    }
    MongoClient.connect(connectionString).then(clientObject=>{
        var database=clientObject.db("youtubedb");
        database.collection("videos").updateOne({video_id:parseInt(req.params.id)},{$set:video})
        .then(()=>{
            console.log('Videos Updated');
            res.end();
        })

    })
    
})

app.delete('/videos/:id',(req,res)=>{
    MongoClient.connect(connectionString).then(clientObject=>{
        var database=clientObject.db("youtubedb");
        database.collection('videos').deleteOne({video_id:parseInt(req.params.id)})
        .then(()=>{
            console.log("Videos Deleted");
            res.end();
        })
    })

})

//app.listen(4041);
//console.log('API Started http://127.0.0.1:4041');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on " + PORT);
});

*/

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ MongoDB Atlas Connection
const connectionString =
  "mongodb+srv://sunil_nit:12345@sunil.tlsk3ml.mongodb.net/youtubedb?retryWrites=true&w=majority&appName=SUNIL";

const client = new MongoClient(connectionString);

// connect once
client.connect().then(() => {
  console.log("MongoDB Connected");
});

// -------------------- ADMIN --------------------
app.get("/admin", async (req, res) => {
  try {
    const db = client.db("youtubedb");
    const data = await db.collection("admin").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------- USERS --------------------
app.get("/users", async (req, res) => {
  try {
    const db = client.db("youtubedb");
    const data = await db.collection("users").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------- CATEGORIES --------------------
app.get("/categories", async (req, res) => {
  try {
    const db = client.db("youtubedb");
    const data = await db.collection("categories").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------- VIDEOS --------------------
app.get("/videos", async (req, res) => {
  try {
    const db = client.db("youtubedb");
    const data = await db.collection("videos").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------- SINGLE VIDEO --------------------
app.get("/videos/:id", async (req, res) => {
  try {
    const db = client.db("youtubedb");
    const data = await db
      .collection("videos")
      .findOne({ video_id: parseInt(req.params.id) });

    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------- REGISTER USER --------------------
app.post("/register_user", async (req, res) => {
  try {
    const user = {
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      password: req.body.password,
      email: req.body.email,
    };

    const db = client.db("youtubedb");
    await db.collection("users").insertOne(user);

    console.log("User Registered");
    res.send({ message: "User Registered" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------- ADD VIDEO --------------------
app.post("/add_video", async (req, res) => {
  try {
    const video = {
      video_id: parseInt(req.body.video_id),
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      likes: parseInt(req.body.likes),
      dislikes: parseInt(req.body.dislikes),
      views: parseInt(req.body.views),
      comments: req.body.comments,
      category_id: parseInt(req.body.category_id),
    };

    const db = client.db("youtubedb");
    await db.collection("videos").insertOne(video);

    console.log("Video Added");
    res.send({ message: "Video Added" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------- UPDATE VIDEO --------------------
app.put("/videos/:id", async (req, res) => {
  try {
    const video = {
      video_id: parseInt(req.body.video_id),
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      likes: parseInt(req.body.likes),
      dislikes: parseInt(req.body.dislikes),
      views: parseInt(req.body.views),
      comments: req.body.comments,
      category_id: parseInt(req.body.category_id),
    };

    const db = client.db("youtubedb");

    await db
      .collection("videos")
      .updateOne({ video_id: parseInt(req.params.id) }, { $set: video });

    console.log("Video Updated");
    res.send({ message: "Video Updated" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------- DELETE VIDEO --------------------
app.delete("/videos/:id", async (req, res) => {
  try {
    const db = client.db("youtubedb");

    await db
      .collection("videos")
      .deleteOne({ video_id: parseInt(req.params.id) });

    console.log("Video Deleted");
    res.send({ message: "Video Deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
