import mongoose, { model } from "mongoose";

// 1. Create model
// 2. Create schema based off of that model

const noteSchema = new mongoose.Schema({
    title :{
        type:String,
        required: true,
    },
    content :{
        type: String,
        required: true,
    },
},
    {timestamps: true} //createdAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;