module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema(
        {
            title: String,
            userAvatar: String,
            content: String,
            userId: String,
            read:Boolean,
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.plugin(mongoosePaginate);

    const Notification = mongoose.model("notification", schema);
    return Notification;
};