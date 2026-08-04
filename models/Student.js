import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    age:{
        type: Number,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    cgpa:{
        type: Number,
        min:0,
        max:4,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: false,
    }

}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;