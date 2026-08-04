import Student from "../models/Student.js";

//CREATE
export const createStudent = async (req, res) => {
    try{
        const student  = await Student.create(req.body);
        res.status(201).json(student);
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}

//GET ALL
export const getAllStudents = async (req, res) => {
    try{
        const students = await Student.find();
        res.status(200).json(students);
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}

//GET SINGLE
export const getSingleStudent = async (req, res) => {
    try{
        const student = await Student.findById(req.params.id);
        res.status(200).json(student);
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}

export const updateStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true,
        });
        if (!student) {
            return res.status(404).json({error: "Student not found"});
        }
        res.status(200).json(student);
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}
export const deleteStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({error: "Student not found"});
        }
        res.status(200).json(
            {
                message: "Student deleted successfully",
                student
            }
        );
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}