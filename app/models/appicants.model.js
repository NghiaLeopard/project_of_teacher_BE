module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema(
        {
            jobId: String,
            employeeId: String,
            employeeName:String,
            employerFullname: String,
            employerAvatar: String,
            cv: String,
            status:Boolean,
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(mongoosePaginate);

    const Applicants = mongoose.model("applicants", schema);
    return Applicants;
};