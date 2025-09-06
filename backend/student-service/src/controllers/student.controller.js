import * as studentService from "../services/student.service.js";

// 1 create student
export const createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 2 get student by mssv
export const getStudentByMssv = async (req, res) => {
  try {
    const student = await studentService.getStudentByMssv(req.params.mssv);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3 update student
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentService.updateStudent(
      req.params.mssv,
      req.body
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// 4 delete student
export const deleteStudent = async (req, res) => {
  try {
    const deleted = await studentService.deleteStudent(req.params.mssv);
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5 get fees for student
export const getFeesForStudent = async (req, res) => {
  try {
    const fees = await studentService.getFeesForStudent(req.params.mssv);
    res.json(fees);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6 assign fees to student
export const assignFeesToStudent = async (req, res) => {
  try {
    const assignedFees = await studentService.assignFeesToStudent(
      req.params.mssv,
      req.body.fees
    );
    res.status(201).json(assignedFees);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 7 update a particular student_fee
export const updateStudentFee = async (req, res) => {
  try {
    const updatedStudentFee = await studentService.updateStudentFee(
      req.params.mssv,
      req.params.studentFeeId,
      req.body
    );
    if (!updatedStudentFee) {
      return res.status(404).json({ message: "Student fee not found" });
    }
    res.json(updatedStudentFee);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 8 get student_fee by id (optional)
export const getStudentFeeById = async (req, res) => {
  try {
    const studentFee = await studentService.getStudentFeeById(req.params.studentFeeId);
    if (!studentFee) {
      return res.status(404).json({ message: "Student fee not found" });
    }
    res.json(studentFee);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};