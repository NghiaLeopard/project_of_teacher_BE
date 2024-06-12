const db = require("../models");
const User = db.user;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.employeeBoard = (req, res) => {
  res.status(200).send("Employee Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.employerBoard = (req, res) => {
  res.status(200).send("Employer Content.");
};
exports.findAll = (req, res) => {
  const { page, size, username,jobsapplied } = req.query;
  // var condition = title
  //     ? { title: { $regex: new RegExp(title), $options: "i" } }
  //     : {};
  var query = {}
    if(username){
        query.username={ $regex: new RegExp(username), $options: "i" }
    }
    if (jobsapplied){
        query.jobsapplied = { $in: [jobsapplied] }
    }
  //const { limit, offset } = getPagination(page, size);
    let limit = size ? +size : 3
    let offset = page ? page * limit : 0
    var options = {
        limit: limit,
        offset: offset,

        sort: {
            createdAt: -1
        }

    }
  User.paginate(query, options)
      .then((data) => {
        res.send({
          totalItems: data.totalDocs,
          users: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving jobs.",
        });
      });
};
exports.findAllWithoutPagination = (req, res) => {
    const username = req.query.username;
    const condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

    User.find(condition)
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Job with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Tutorial with id=" + id });
      });
};

// Update a Job by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
};
exports.updateAppliedJob = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    //console.log(req.body)
    const id = req.params.id;

    User.findByIdAndUpdate(id, {$push:{jobsapplied:req.body.jobsapplied}}, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

exports.updateSavedJob = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    //console.log(req.body)
    const id = req.params.id;

    User.findByIdAndUpdate(id, {$push:{jobssaved:req.body.jobssaved}}, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Jobs were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while removing all jobs."
        });
      });
};

// Find all published Jobs
exports.findAllApproved = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  User.paginate({ approved: true }, { offset, limit })
      .then((data) => {
        res.send({
          totalItems: data.totalDocs,
          users: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving jobs.",
        });
      });
};
exports.findAllUsers = (req, res) => {
    const { page, size, username,email } = req.query;
    // var condition = title
    //     ? { title: { $regex: new RegExp(title), $options: "i" } }
    //     : {};
    var query = {}
    if(username){
        query.username={ $regex: new RegExp(username), $options: "i" }
    }
    if(!email){
        query.email={$not:{$regex:"admin@gmail.com"}}
    }
    const { limit, offset } = getPagination(page, size);

    User.paginate(query, { offset, limit })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                users: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jobs.",
            });
        });
};
