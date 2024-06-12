// const controller = require("../controllers/job.controller");
//
// module.exports = function(app) {
//     // var router = require("express").Router();
//     app.post("/api/job/create", controller.create);
//     app.get("/api/job/",controller.findAll);
//     app.get("api/job/allapproved",controller.findAllApproved);
//     app.get("api/job/:id",controller.findOne);
//     app.put("api/job/:id",controller.update);
//     app.delete("api/job/:id",controller.delete);
//     app.delete("api/job/deleteall",controller.deleteAll);
//
//     //app.use("api/jobs", controller);
// }
const jobs = require("../controllers/job.controller");
module.exports = app => {
    const jobs = require("../controllers/job.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", jobs.create);

    // Retrieve all Tutorials
    router.get("/", jobs.findAll);

    // Retrieve all published Tutorials
    router.get("/approved", jobs.findAllApproved);

    router.get("/differenttitle",jobs.findAllApprovedDifferentTitle)
    // Retrieve a single Tutorial with id
    router.get("/:id", jobs.findOne);

    // Update a Tutorial with id
    router.put("/:id", jobs.update);

    router.put("/saved/:id", jobs.updateSavedUser);

    router.put("/applied/:id", jobs.updateAppliedUser);

    // Delete a Tutorial with id
    router.delete("/:id", jobs.delete);

    // Create a new Tutorial
    router.delete("/", jobs.deleteAll);

    app.use("/api/job", router);
};