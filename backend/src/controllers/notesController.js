import Note from "../models/note.js"

export async function getAllNotes(req,res){
    try {
        const notes = await Note.find().sort({createdAt: -1}); //newest one on top
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in the getAllNotes method", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function getNotesById(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found!"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in the getNotesById method", error);
        res.status(500).json({message: "Internal Server Error"});   
    }
}

export async function createNote(req,res){
    try {
        const {title,content} = req.body;
        const note = new Note({title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in the createNote method", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function updateNote(req,res){
   try {
    const {title,content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{
        new:true,
    });

    if(!updatedNote) return res.status(404).json({message:"Note not found!"});
    res.status(200).json(updatedNote);
   } catch (error) {
    console.error("Error in the updateNote method", error);
    res.status(500).json({message: "Internal Server Error"});
   }
};

export async function deleteNote(req,res){
    try {
    const {title,content} = req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id,{title,content});
    if(!deletedNote) return res.status(404).json({message:"Note not found!"});
    res.status(200).json(deletedNote);
    } catch (error) {
    console.error("Error in the deleteNote method", error);
    res.status(500).json({message: "Internal Server Error"});
    }
};