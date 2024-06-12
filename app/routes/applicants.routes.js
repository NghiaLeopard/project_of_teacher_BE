module.exports = app => {
    const applicants = require("../controllers/applicants.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", applicants. create);

    // Retrieve all Tutorials
    router.get("/", applicants.findAll);

    // Retrieve all published Tutorials
    router.get("/status", applicants.findAllApproved);

    // Retrieve a single Tutorial with id
    router.get("/:id", applicants.findOne);

    // Update a Tutorial with id
    router.put("/:id", applicants.update);

    // Delete a Tutorial with id
    router.delete("/:id", applicants.delete);

    // Create a new Tutorial
    router.delete("/", applicants.deleteAll);

    app.use("/api/applicants", router);
};