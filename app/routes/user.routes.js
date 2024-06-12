const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/employee", [authJwt.verifyToken], controller.employeeBoard);

  app.get(
    "/api/test/employer",
    [authJwt.verifyToken, authJwt.isEmployer],
    controller.employerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
      "/api/user",controller.findAll
  );
  // app.get(
  //     "/api/applicants",controller.findAllWithoutPagination
  // );
  app.get(
      "/api/users",controller.findAllUsers
  )
  app.get("/api/user/:id", controller.findOne);
  app.delete("/api/user/:id", controller.delete);
  app.put("/api/user/:id",controller.update);
  app.put("/api/user/job/:id",controller.updateAppliedJob);
  app.put("/api/user/saved/:id",controller.updateSavedJob);
};
