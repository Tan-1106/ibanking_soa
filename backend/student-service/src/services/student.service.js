import Student from "../models/student.model.js";
import Fee from "../models/fee.model.js";
import StudentFee from "../models/studentFee.model.js";
import ApiError from "../utils/ApiError.js";

const studentService = {



  createStudent: async ({ id, fullName, email }) => {
    const newStudent = await Student.create({ id, fullName, email });
    return newStudent;
  },

  // 2 Get student by ID
  getStudentByID: async (id) => {
    return await Student.findOne({ where: { id } });
  },

  // 3 Update student
  updateStudentById: async (id, updates) => {
    const student = await Student.findOne({ where: { id } });
    if (!student) {
      throw new ApiError(404, "Student not found", " Student with ID " + id + " does not exist");
    }
    await student.update(updates);
    return student;
  },

  // 4 Delete student
  deleteStudentById: async (id) => {
    const student = await Student.findOne({ where: { id } });
    if (!student) {
      throw new ApiError(404, "Student not found", " Student with ID " + id + " does not exist");
    }
    await student.destroy();
    return true;
  },

  // 5 Get unpaid fees for student
  // Trả về danh sách các fee chưa đóng + tổng tiền, call trang 2 khi search bằng id
  getTuitionByStudentId: async (studentId) => {
    const student = await Student.findOne({ where: { id: studentId } });
    if (!student) {
      throw new ApiError(404, "Student not found", " Student with SID " + studentId + " does not exist");
    }

    // Lấy studentFee (pending) kèm Fee detail
    const studentFees = await StudentFee.findAll({
      where: { studentId: student.id, status: "unpaid" },
      include: [
        {
          model: Fee,
          attributes: ["id", "subject", "amount", "semester", "year"],
        },
      ],
    });

    // Tính tổng
    const totalPending = studentFees.reduce(
      (sum, sf) => sum + parseFloat(sf.amount),
      0
    );

    return {
      isPayable: totalPending > 0,
      studentId: student.id, // để truyền vào create payment nè
      fullName: student.fullName, // để hiển thị tên sinh viên nè
      totalPending, // để hiển thị tổng tiền nè
      fees: studentFees.map((sf) => ({ // thằng này để bạn làm content nè, tự suy nghĩ làm đi =))), chưa nghĩ ra làm sao
        studentFeeId: sf.id,
        status: sf.status,
        dueDate: sf.dueDate,
        amount: sf.amount,
        paidAt: sf.paidAt,
        paymentRef: sf.paymentRef,
        fee: {
          id: sf.Fee.id,
          description: sf.Fee.description,
          amountDefault: sf.Fee.amount,
          semester: sf.Fee.semester,
          year: sf.Fee.year,
        },
      })),
    };
  },


  // 6 Assign fees to student
  assignFeesToStudent: async (studentId, feeIds) => {
    const student = await Student.findOne({ where: { id: studentId } });
    if (!student) {
      throw new ApiError(404, "Student not found", " Student with ID " + studentId + " does not exist");
    }
    for (const feeId of feeIds) {
      const fee = await Fee.findByPk(feeId);
      if (!fee) {
        throw new ApiError(404, "Fee not found", " Fee with ID " + feeId + " does not exist");
      }
      await StudentFee.create({
        studentId: student.id,
        feeId: fee.id,
        amount: fee.amount,
      });
    }
    return true;
  },

  // 7 Update a particular student_fee
  updateStudentFee: async (studentFeeId, updates) => {
    const studentFee = await StudentFee.findByPk(studentFeeId);
    if (!studentFee) {
      throw new ApiError(404, "StudentFee not found", " StudentFee with ID " + studentFeeId + " does not exist");
    }
    await studentFee.update(updates);
    return studentFee;
  },
  // 8 Get student_fee by id (optional)
  getStudentFeeById: async (studentFeeId) => {
    return await StudentFee.findByPk(studentFeeId);
  },

  // 9 Get multiple student_fees by IDs (for payment validation)
  getStudentFeesByIds: async (studentFeeIds) => {
    return await StudentFee.findAll({
      where: { id: studentFeeIds },
    });
  },

  // 10 Mark fees as paid (gọi từ payment service sau khi thanh toán thành công)
  markFeesPaid: async (studentFeeIds, paymentRef) => {
    if (!studentFeeIds || studentFeeIds.length === 0) {
      throw new ApiError(400, "Invalid request", " studentFeeIds must be a non-empty array ");
    }

    const studentFees = await StudentFee.findAll({ where: { id: studentFeeIds, status: "unpaid" } });
    if (studentFees.length !== studentFeeIds.length) {
      throw new ApiError(404, "Not Found", "Some student fees not found or already paid ");
    }

    for (const studentFee of studentFees) {
      studentFee.status = "paid";
      studentFee.paidAt = new Date();
      studentFee.paymentRef = paymentRef;
      await studentFee.save();
    }

    return studentFees;
  },

};
export {
  studentService
} 