const express = require("express");
const ejs = require("ejs");

const app = express();
const path = require("path");

// DB connection
require("./src/db/conn");
const register = require("./src/models/registers");
//Port no
const port = process.env.PORT || 3001;

//Public Static Path

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/images", express.static(path.resolve(__dirname, "assets/images")));

const partials_path = path.join(__dirname, "../views/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");


//declaration
let user, fname, lname, userId;

// //Routing
app.get("/", (req, res) => {
  res.render("home");
});

//register Page`
app.get("/register", (req, res) => {
  res.render("register");
});

//register post
app.post("/register", async (req, res) => {
  try {
    const registerCandidates = new register({
      fullname:req.body.fullname,
      username:req.body.username,
      email:req.body.email,
      number:req.body.number,
      gender:req.body.gender,
      password:req.body.password,
      confirmPassword:req.body.confirmPassword,
    });
    
    const registered = await registerCandidates.save();
    res.status(201).render("login");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/admin_register", async (req, res) => {
  try {
    const registerCandidates = new register({
      fullname:req.body.fullname,
      username:req.body.username,
      email:req.body.email,
      number:req.body.number,
      gender:req.body.gender,
      password:req.body.password,
      confirmPassword:req.body.confirmPassword,
    });
    
    const registered = await registerCandidates.save();
    res.status(201).render("admin_login");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/admin_login",(req,res)=>{ res.render('admin_login')})

// login get
app.get("/login", (req, res) => {
  res.render("login");
});

// login post
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    user = await register.findOne({ email: email });
    if (user.password === password) {
      res.send(`
      <script>
        alert("Login Successful "); window.location.href = "/student_app";
      </script>`);
    } else {
      res.send(`
      <script>
        alert("Wrong Login Details"); window.location.href = "/login";
      </script>`);
    }
  } catch (error) {
    res.send(`
      <script>
        alert("Wrong Login Details"); window.location.href = "/login";
      </script>`);
  }
});

app.post("/admin_login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    user = await register.findOne({ email: email });
    if (user.password === password) {
      res.send(`
      <script>
        alert("Login Successful "); window.location.href = "/admin_lobi";
      </script>`);
    } else {
      res.send(`
      <script>
        alert("Wrong Login Details"); window.location.href = "/admin_login";
      </script>`);
    }
  } catch (error) {
    res.send(`
      <script>
        alert("Wrong Login Details"); window.location.href = "/admin_login";
      </script>`);
  }
});
app.get("/admin_register",(req,res)=>{ res.render('admin_register')})


// studentapp
app.get("/student_app",(req,res)=>{
  res.render("student_app")
})

app.get("/admin_lobi",(req,res)=>{
  res.render("admin_lobi")
})

// info
app.get("/info",(req,res)=>{
  res.render("info")
})

// console.log(fname);

//profile
// app.get("/profile", (req, res) => {
//   let allAssign = assignments
//     .find({})
//     .then((assign) => {
//       res.render("profile", {
//         username: fname,
//         useremail: user.email,
//         allAssign: assign,
//         username: fname,
//         sirname: lname,
//         userId: userId,
//       });
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });

// //forget pass get
// app.get("/forgetPass", (req, res) => {
//   res.render("forgetPass");
// });

// // forgetpass post
// app.post("/forgetPass", async (req, res) => {
//   try {
//     const email = req.body.email;
//     const secQue = req.body.secQue;

//     user = await register.findOne({ email: email });
//     pass = user.password;
//     if (user.email === email && user.secQue === secQue) {
//       res.status(201).render("showPass", { userpass: pass });
//     } else {
//       res.send(`
//       <script>
//         alert("Wrong Credentials"); window.location.href = "/forgetPass";
//       </script>`);
//     }
//   } catch (error) {
//     res.send(`
//       <script>
//         alert("Wrong Credentials"); window.location.href = "/forgetPass";
//       </script>`);
//   }
// });
//404 Error Page
app.get("*", (req, res) => {
  res.render("404error");
});

//Listening to the port
app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
