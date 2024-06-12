module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema(
        {
            title: String,
            name: String,
            salary: String,
            number: String,
            form: String,
            rank: String,
            gender: String,
            experience: String,
            profession: String,
            area: String,
            address: String,
            description: String,
            requirement: String,
            benefit: String,
            deadline: String,
            companyIntro: String,
            companyScale: String,
            companyAddress: String,
            approved: Boolean,
            avatar:String,
            employerId: String,
            appliedUser:[
                {type: String}
            ],
            savedUser:[
                {type: String}
            ],
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(mongoosePaginate);

    const Job = mongoose.model("job", schema);
    return Job;
};