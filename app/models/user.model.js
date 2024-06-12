module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema(
        {
            username: String,
            email: String,
            password: String,
            roles: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Role"
                }],
            fullname: String,
            phone: String,
            address: String,
            gender: String,
            birthday: String,
            age: String,
            profession: String,
            avatar: String,
            website: String,
            description: String,
            cv: String,
            jobsapplied:[
                {type: String}
            ],
            jobssaved:[
                {type: String}
            ],
            scale: String,

        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(mongoosePaginate);

    const User = mongoose.model("user", schema);
    return User;
};