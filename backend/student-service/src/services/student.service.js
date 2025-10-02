import Student from "../models/student.model.js";
import Fee from "../models/fee.model.js";
import StudentFee from "../models/studentFee.model.js";
import ApiError from "../utils/ApiError.js";
import { Op } from "sequelize";
const EXPIRED_PAYMENT_TIMEOUT = 5 * 60 * 1000;
const studentService = {



  createStudent: async ({ id, fullName, email }) => {
    const newStudent = await Student.create({ id, fullName, email });
    return newStudent;
  },

  getStudentByID: async (id) => {
    return await Student.findOne({ where: { id } });
  },

  updateStudentById: async (id, updates) => {
    const student = await Student.findOne({ where: { id } });
    if (!student) {
      throw new ApiError(404, "Student not found", " Student with ID " + id + " does not exist");
    }
    await student.update(updates);
    return student;
  },

  deleteStudentById: async (id) => {
    const student = await Student.findOne({ where: { id } });
    if (!student) {
      throw new ApiError(404, "Student not found", " Student with ID " + id + " does not exist");
    }
    await student.destroy();
    return true;
  },

  getTuitionByStudentId: async (studentId) => {
    const student = await Student.findOne({ where: { id: studentId } });
    if (!student) {
      throw new ApiError(404, "Student not found", " Student with SID " + studentId + " does not exist");
    }

    const studentFees = await StudentFee.findAll({
      where: {
        studentId: student.id,
        [Op.or]: [
          { status: "unpaid" },
          { status: "processing" }
        ]
      },

      include: [
        {
          model: Fee,
          attributes: ["id", "subject", "amount", "semester", "year"],
        },
      ],
    });

    const totalPending = studentFees.reduce(
      (sum, sf) => sum + parseFloat(sf.amount),
      0
    );

    return {
      isPayable: studentFees[0].status !== "processing",
      studentId: student.id,
      fullName: student.fullName,
      totalPending,
      studentFees: studentFees.map((sf) => ({
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

  updateStudentFee: async (studentFeeId, updates) => {
    const studentFee = await StudentFee.findByPk(studentFeeId);
    if (!studentFee) {
      throw new ApiError(404, "StudentFee not found", " StudentFee with ID " + studentFeeId + " does not exist");
    }
    await studentFee.update(updates);
    return studentFee;
  },
  getStudentFeeById: async (studentFeeId) => {
    return await StudentFee.findByPk(studentFeeId);
  },

  getStudentFeesByStudentId: async (studentId) => {
    const student = await Student.findOne({ where: { id: studentId } });
    if (!student) {
      throw new ApiError(404, "Student not found", " Student with ID " + studentId + " does not exist");
    }
    return await StudentFee.findAll({ where: { studentId: student.id, status: "unpaid" } });
  },
  markProcessingStudentFees: async (studentFeeIds) => {
    const result = await StudentFee.update(
      { status: "processing" },
      { where: { id: studentFeeIds, status: "unpaid" } }
    );
    setTimeout(async () => {
      const processingFees = await StudentFee.findAll({
        where: { id: studentFeeIds, status: "processing" }
      });
      for (const fee of processingFees) {
        await fee.update({ status: "unpaid" });
      }
    }, EXPIRED_PAYMENT_TIMEOUT);

    return result > 0;

  },

  markFeesPaid: async (studentFeeIds, paymentRef) => {
    if (!studentFeeIds || studentFeeIds.length === 0) {
      throw new ApiError(400, "Invalid request", " studentFeeIds must be a non-empty array ");
    }

    const studentFees = await StudentFee.findAll({ where: { id: studentFeeIds, status: "processing" } });
    if (studentFees.length !== studentFeeIds.length) {
      throw new ApiError(404, "Not Found", "Some student fees not found or already paid ");
    }

    for (const studentFee of studentFees) {
      studentFee.status = "paid";
      studentFee.paidAt = new Date();
      studentFee.paymentRef = paymentRef;
      await studentFee.save();
    }

    return true;
  },



};
export {
  studentService
} 