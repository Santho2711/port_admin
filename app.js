const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const path = require("path");
const Database = require("./db");
const rootPath = require("./utils/path");
const authRoute = require("./routes/authentication");
const homeRoute = require("./routes/home");
const aboutRoute = require("./routes/about");
const contactRoute = require("./routes/contacts");
const backgroundRoute = require("./routes/background");
const skillsRoute = require("./routes/skills");
const projectsRoute = require('./routes/projects')
const usersRoute = require("./routes/users");
const apiRoute = require("./controller/Admin_Api");
const handleBarHelpers = require("./utils/handleBarHelpers");
const session = require("express-session");
const isAuth = require("./middlewares/isAuth");
const bodyParser = require('body-parser')
const cors = require('cors')
// const skillCollection = require("./models/skillModel");
const reachesCollection = require("./models/contactModel");
const skillCollection = require("./models/skillModel");
const homeCollection = require("./models/homeModel");
const projectCollection = require("./models/projectsModel");

// performing the basic things to the engine and static files
app.engine(
  "hbs",
  exhbs.engine({
    layoutsDir: "views/",
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: handleBarHelpers,
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(rootPath, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({
  extended:true
}));
app.use(
  cors({
    origin: true,
  })
);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
Database.ConnectDataBase();

app.use(
  session({
    secret: "Admin_session",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 30 },
  })
);

app.use("/home",isAuth, homeRoute);
app.use("/about",isAuth, aboutRoute);
app.use("/background",isAuth, backgroundRoute);
app.use("/skills",isAuth, skillsRoute);
app.use("/projects",isAuth, projectsRoute);
app.use("/contacts",isAuth, contactRoute);
app.use("/users",isAuth, usersRoute);
app.use('/Admin_api',apiRoute)


app.get("/dashboard", isAuth,async (req, res) => {
  const skillCount = await skillCollection.find() ?? [];
  const rolecount = await homeCollection.findOne({}).lean() ?? [];
  const contacts = await reachesCollection.find({}).lean() ?? []
  const projects = await projectCollection.find() ?? []
  res.render("dashboard", {
    roleCount: rolecount?.roles?.length,
    skillcount: skillCount.length,
    projectcount: projects.length,
    contactCount : contacts?.length,
    datas:contacts
  });
});
app.use("/",authRoute)

app.use((req,res) => {
  res.send('Not found').status(404)
})
app.listen(process.env.PORT);
