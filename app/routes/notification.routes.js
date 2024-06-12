//const applicants = require("../controllers/applicants.controller");
module.exports = app => {
    const notification = require("../controllers/notification.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", notification. create);

    // Retrieve all Tutorials
    router.get("/", notification.findAll);

    // Retrieve all published Tutorials
    router.get("/status", notification.findAllApproved);

    // Retrieve a single Tutorial with id
    router.get("/:id", notification.findOne);

    // Update a Tutorial with id
    router.put("/:id", notification.update);

    // Delete a Tutorial with id
    router.delete("/:id", notification.delete);

    // Create a new Tutorial
    router.delete("/", notification.deleteAll);

    app.use("/api/notification", router);
};