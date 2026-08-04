import express from 'express';
import {createStudent, deleteStudent, getAllStudents, getSingleStudent, updateStudent} from "../controllers/studentControllers.js";
const router = express.Router();

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getSingleStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
export default router;