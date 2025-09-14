import * as studentService from "../services/student.service.js";
import ApiResponse from "../utils/Api.response.js";

// 1 create student
export const createStudent = async (req, res) => {
  const student = await studentService.createStudent(req.body);
  res.status(201).json(new ApiResponse(201, "Student created successfully", student));
};

// 2 get student by mssv
export const getStudentByMssv = async (req, res) => {
  const student = await studentService.getStudentByMssv(req.params.mssv);
  if (!student) {
    throw new ApiError(404, "Student not found", " Student with MSSV " + req.params.mssv + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "Student fetched successfully", student));
};

// 3 update student
export const updateStudent = async (req, res) => {
  const updatedStudent = await studentService.updateStudent(
    req.params.mssv,
    req.body
  );
  if (!updatedStudent) {
    throw new ApiError(404, "Student not found", " Student with MSSV " + req.params.mssv + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "Student updated successfully", updatedStudent));
}

// 4 delete student
export const deleteStudent = async (req, res) => {
  const deleted = await studentService.deleteStudent(req.params.mssv);
  if (!deleted) {
    throw new ApiError(404, "Student not found", " Student with MSSV " + req.params.mssv + " does not exist");
  }
  res.json(new ApiResponse(200, "Student deleted successfully", deleted));
};

// 5 get fees for student
export const getFeesForStudent = async (req, res) => {
  const fees = await studentService.getFeesForStudent(req.params.mssv);
  res.json(new ApiResponse(200, "Fees fetched successfully", fees));
};

// 6 assign fees to student
export const assignFeesToStudent = async (req, res) => {
  const assignedFees = await studentService.assignFeesToStudent(
    req.params.mssv,
    req.body.fees
  );
  res.json(new ApiResponse(201, "Fees assigned successfully", assignedFees));
};

// 7 update a particular student_fee
export const updateStudentFee = async (req, res) => {
  const updatedStudentFee = await studentService.updateStudentFee(
    req.params.mssv,
    req.params.studentFeeId,
    req.body
  );
  if (!updatedStudentFee) {
    throw new ApiError(404, "Student fee not found", " Student fee with ID " + req.params.studentFeeId + " does not exist for student with MSSV " + req.params.mssv);
  }
  res.json(new ApiResponse(200, "Student fee updated successfully", updatedStudentFee));
};

// 8 get student_fee by id (optional)
export const getStudentFeeById = async (req, res) => {
  const studentFee = await studentService.getStudentFeeById(req.params.studentFeeId);
  if (!studentFee) {
    throw new ApiError(404, "Student fee not found", " Student fee with ID " + req.params.studentFeeId + " does not exist");
  }
  res.json(new ApiResponse(200, "Student fee fetched successfully", studentFee));
};

// 9 get multiple student_fees by IDs (for payment validation)
export const getStudentFeesByIds = async (req, res) => {
  const { studentFeeIds } = req.body;
  if (!Array.isArray(studentFeeIds) || studentFeeIds.length === 0) {
    throw new ApiError(400, "Invalid request", " studentFeeIds must be a non-empty array ");
  }
  const studentFees = await studentService.getStudentFeesByIds(studentFeeIds);
  res.json(new ApiResponse(200, "Student fees fetched successfully", studentFees));
};