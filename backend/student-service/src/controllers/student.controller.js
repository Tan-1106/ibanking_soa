import { studentService } from "../services/student.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";

const studentController = {
  // 1 create student
  createStudent: async (req, res) => {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(new ApiResponse(201, "Student created successfully", student));
  },

  // 2 get student by ID
  getStudentByID: async (req, res) => {
    const student = await studentService.getStudentByID(req.params.id);
    if (!student) {
      throw new ApiError(404, "Student not found", " Student with ID " + req.params.id + " does not exist");
    }
    res.status(200).json(new ApiResponse(200, "Student fetched successfully", student));
  },

  // 3 update student
  updateStudent: async (req, res) => {
    const updatedStudent = await studentService.updateStudentById(
      req.params.id,
      req.body
    );
    if (!updatedStudent) {
      throw new ApiError(404, "Student not found", " Student with ID " + req.params.id + " does not exist");
    }
    res.status(200).json(new ApiResponse(200, "Student updated successfully", updatedStudent));
  },

  // 4 delete student
  deleteStudent: async (req, res) => {
    const deleted = await studentService.deleteStudentById(req.params.id);
    if (!deleted) {
      throw new ApiError(404, "Student not found", " Student with ID " + req.params.id + " does not exist");
    }
    res.json(new ApiResponse(200, "Student deleted successfully", deleted));
  },

  // 5 get tuition for student
  getTuitionByStudentId: async (req, res) => {
    const tuition = await studentService.getTuitionByStudentId(req.params.id);
    res.json(new ApiResponse(200, "Tuition fetched successfully", tuition));
  },

  // 6 assign fees to student
  assignFeesToStudent: async (req, res) => {
    const assignedFees = await studentService.assignFeesToStudent(
      req.params.studentId,
      req.body.feeIds
    );
    res.json(new ApiResponse(201, "Fees assigned successfully", assignedFees));
  },

  // 7 update a particular student_fee
  updateStudentFee: async (req, res) => {
    const updatedStudentFee = await studentService.updateStudentFee(
      req.params.studentFeeId,
      req.body
    );
    if (!updatedStudentFee) {
      throw new ApiError(404, "Student fee not found", " Student fee with ID " + req.params.studentFeeId + " does not exist for student with SID " + req.params.sID);
    }
    res.json(new ApiResponse(200, "Student fee updated successfully", updatedStudentFee));
  },

  // 8 get student_fee by id (optional)
  getStudentFeeById: async (req, res) => {
    const studentFee = await studentService.getStudentFeeById(req.params.studentFeeId);
    if (!studentFee) {
      throw new ApiError(404, "Student fee not found", " Student fee with ID " + req.params.studentFeeId + " does not exist");
    }
    res.json(new ApiResponse(200, "Student fee fetched successfully", studentFee));
  },


  // 10 Mark fees as paid (called from payment service after successful payment)
  // POST /students/fees/mark-paid
  markFeesPaid: async (req, res) => {
    const { paymentRef, studentFeeIds } = req.body;
    const updated = await studentService.markFeesPaid(studentFeeIds, paymentRef);
    res.json(new ApiResponse(200, "Fees marked as paid successfully", updated));
  }
};
export {
  studentController
}