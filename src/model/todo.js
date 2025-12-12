import mongoose from "mongoose"

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

export default mongoose.models.TODO || mongoose.model("TODO", TodoSchema)