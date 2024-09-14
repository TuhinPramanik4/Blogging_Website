const { schema , model, Schema} = require("mongoose");


const blogSchema = new Schema({
            title: {
                type: String,
                required: true,
            },
            body: {
                type: String,
                required: true,
            },
            coverImageURL: {
            type: String,
            },
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: "user", 
            },

},
{timestamps:true}
)

const Blog = model("Blog",blogSchema);

module.exports = Blog;
