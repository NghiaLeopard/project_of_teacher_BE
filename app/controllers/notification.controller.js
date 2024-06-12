const db = require("../models");
const Notification = db.notification;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};


// Create and Save a new Job
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        //console.log(re)
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Job
    const notification = new Notification({
        title: req.body.title,
        userAvatar: req.body.userAvatar,
        content: req.body.content,
        userId: req.body.userId,
        read: req.body.read,

    });

    // Save Job in the database
    notification
        .save(notification)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

//Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
    const { page, size, title, userId } = req.query;
    var query = {}
    //     ? { title: { $regex: new RegExp(title), $options: "i" } }
    //     : {};
    // var query ={}
    if(title) {
        query.title = {$regex: new RegExp(title), $options: "i"}
    }
    if(userId) {
        query.userId = {$regex: new RegExp(userId), $options: "i"}
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
    Notification.paginate(query, options)
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                notification: data.docs,
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

// Find a single Job with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Notification.findById(id)
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

    Notification.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

    Notification.findByIdAndRemove(id, { useFindAndModify: false })
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
    Notification.deleteMany({})
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
    const { page, size, title,employerId,profession,area,approved } = req.query;
    var query = {}
    if(title){
        query.title={ $regex: new RegExp(title), $options: "i" }
    }
    if(employerId){
        query.employerId={ $regex: new RegExp(employerId), $options: "i" }
    }
    if(profession){
        query.profession={ $regex: new RegExp(profession), $options: "i" }
    }
    if(area){
        query.area={ $regex: new RegExp(area), $options: "i" }
    }
    if(!approved){
        query.approved={$eq: true}
    }
    const { limit, offset } = getPagination(page, size);

    Notification.paginate(query, { offset, limit })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                notification: data.docs,
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