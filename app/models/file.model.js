// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//     //_id: mongoose.Schema.Types.ObjectId,
//     profileImg: {
//         type: String
//     }
// }, {
//     collection: 'users'
// })
// module.exports = mongoose.model('User', userSchema)

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            fileAddress: {
                type: String
            }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const File = mongoose.model("file", schema);
    return File;
};