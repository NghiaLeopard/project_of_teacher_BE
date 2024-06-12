const db = require("../models");
const Job = db.job;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    sort: {
        created_at: 'desc'
    }
    return {limit, offset};
};


// Create and Save a new Job
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a Job
    const job = new Job({
        title: req.body.title,
        name: req.body.name,
        salary: req.body.salary,
        number: req.body.number,
        form: req.body.form,
        rank: req.body.rank,
        gender: req.body.gender,
        experience: req.body.experience,
        profession: req.body.profession,
        area: req.body.area,
        address: req.body.address,
        description: req.body.description,
        requirement: req.body.requirement,
        benefit: req.body.benefit,
        deadline: req.body.deadline,
        companyIntro: req.body.companyIntro,
        companyScale: req.body.companyScale,
        companyAddress: req.body.companyAddress,
        approved: req.body.approved ? req.body.approved : false,
        avatar: req.body.avatar,
        employerId: req.body.employerId,
    });

    // Save Job in the database
    job
        .save(job)
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
    const {page, size, title, employerId, profession, area} = req.query;
    var query = {}
    //     ? { title: { $regex: new RegExp(title), $options: "i" } }
    //     : {};
    // var query ={}
    if (title) {
        query.title = {$regex: new RegExp(title), $options: "i"}
    }
    if (employerId) {
        query.employerId = {$regex: new RegExp(employerId), $options: "i"}
    }
    if (profession) {
        query.profession = {$regex: new RegExp(profession), $options: "i"}
    }
    if (area) {
        query.area = {$regex: new RegExp(area), $options: "i"}
    }

    let limit = size ? +size : 3
    let offset = page ? page * limit : 0
    var options = {
        limit: limit,
        offset: offset,

        sort: {
            createdAt: -1
        }

    }
    Job.paginate(query, options)
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                jobs: data.docs,
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

    Job.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Tutorial with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Tutorial with id=" + id});
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

    Job.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({message: "Tutorial was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

exports.updateSavedUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    //console.log(req.body)
    const id = req.params.id;

    Job.findByIdAndUpdate(id, {$push:{savedUser:req.body.savedUser}}, { useFindAndModify: false })
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

exports.updateAppliedUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    console.log(req.body);
    const id = req.params.id;

    Job.findByIdAndUpdate(id, {$push:{appliedUser:req.body.appliedUser}}, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({message: "Tutorial was updated successfully."});
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

    Job.findByIdAndRemove(id, {useFindAndModify: false})
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
    Job.deleteMany({})
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
    const {page, size, title, employerId,name, profession, area, form, rank, approved,savedUser,appliedUser} = req.query;
    var query = {}

    if (title) {
        query.title = {$regex: new RegExp(title), $options: "i"}
    }
    if (employerId) {
        query.employerId = {$regex: new RegExp(employerId), $options: "i"}
    }
    if(name){
        query.name = {$regex: new RegExp(name), $options: "i"}
    }
    if (profession) {
        query.profession = {$regex: new RegExp(profession), $options: "i"}
    }

    if (area) {
        query.area = {$regex: new RegExp(area), $options: "i"}
    }
    if(form){
        query.form = {$regex: new RegExp(form), $options: "i"}
    }
    if(rank){
        query.rank = {$regex: new RegExp(rank), $options: "i"}
    }
    if (!approved) {
        query.approved = {$eq: true}
    }
    if (savedUser){
        console.log(savedUser)
        query.savedUser = { $in: [savedUser] }
    }
    if (appliedUser){
        query.appliedUser = { $in: [appliedUser] }
    }
    //const {limit, offset} = getPagination(page, size);
    let limit = size ? +size : 3
    let offset = page ? page * limit : 0
    var options = {
        limit: limit,
        offset: offset,

        sort: {
            updatedAt: -1
        }

    }
    Job.paginate(query, options)
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                jobs: data.docs,
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
exports.findAllApprovedDifferentTitle = (req, res) => {
    const {page, size, title, employerId,name, profession, area, form, rank, approved} = req.query;
    var query = {}

    if (title) {

        query.title = {$not:{$regex: RegExp(title)}}
    }
    if (employerId) {
        query.employerId = {$regex: new RegExp(employerId), $options: "i"}
    }
    if(name){
        query.name = {$regex: new RegExp(name), $options: "i"}
    }
    if (profession) {
        query.profession = {$regex: new RegExp(profession), $options: "i"}
    }

    if (area) {
        query.area = {$regex: new RegExp(area), $options: "i"}
    }
    if(form){
        query.form = {$regex: new RegExp(form), $options: "i"}
    }
    if(rank){
        query.rank = {$regex: new RegExp(rank), $options: "i"}
    }
    if (!approved) {
        query.approved = {$eq: true}
    }

    // {limit, offset} = getPagination(page, size);
    let limit = size ? +size : 3
    let offset = page ? page * limit : 0
    var options = {
        limit: limit,
        offset: offset,

        sort: {
            updatedAt: -1
        }

    }
    Job.paginate(query, options)
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                jobs: data.docs,
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