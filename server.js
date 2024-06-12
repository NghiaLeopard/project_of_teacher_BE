const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
const api = require("./app/routes/file.routes");
var corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://jobdhhp-git-main-nghialeopards-projects.vercel.app/",
        "https://jobdhhp.vercel.app",
    ],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/fileStore", express.static("fileStore"));
app.use("/api/file", api);
const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(
        `mongodb+srv://nghiabeo1605:0945639220beo@cluster0.othqan3.mongodb.net/${dbConfig.DB}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to HieuD application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/job.routes")(app);
require("./app/routes/applicants.routes")(app);
require("./app/routes/notification.routes")(app);
// require("./app/routes/users.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "employee",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'employee' to roles collection");
            });

            new Role({
                name: "employer",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'employer' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
