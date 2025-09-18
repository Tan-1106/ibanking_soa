import Student from "../models/student.model.js";
import Fee from "../models/fee.model.js";
import StudentFee from "../models/studentFee.model.js";
import ApiError from "../utils/ApiError.js";

// 1 Create student
export const createStudent = async ({ mssv, fullName, email }) => {
  const newStudent = await Student.create({ mssv, fullName, email });
  return newStudent;
}

// 2 Get student by MSSV
export const getStudentByMssv = async (mssv) => {
  return await Student.findOne({ where: { mssv } });
}

// 3 Update student
export const updateStudent = async (mssv, updates) => {
  const student = await Student.findOne({ where: { mssv } });
  if (!student) {
    return null;
  }
  await student.update(updates);
  return student;
}

// 4 Delete student
export const deleteStudent = async (mssv) => {
  const student = await Student.findOne({ where: { mssv } });
  if (!student) {
    return false;
  }
  await student.destroy();
  return true;
}

// 5 Get unpaid fees for student
// Trả về danh sách các fee chưa đóng + tổng tiền, call trang 2 khi search bằng mssv
export const getFeesForStudent = async (mssv) => {
  const student = await Student.findOne({ where: { mssv } });
  if (!student) {
    throw new ApiError(404, "Student not found", " Student with MSSV " + mssv + " does not exist");
  }

  // Lấy studentFee (pending) kèm Fee detail
  const studentFees = await StudentFee.findAll({
    where: { studentId: student.id, status: "pending" },
    include: [
      {
        model: Fee,
        attributes: ["id", "description", "amount", "semester", "year"],
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
};
export const searchTuitionByMssv = async (mssv) => {
  const student = await Student.findOne({ where: { mssv } });
  if (!student) {
    throw new ApiError(404, "Student not found", " Student with MSSV " + mssv + " does not exist");
  }

  const studentFees = await StudentFee.findAll({
    where: { studentId: student.id, status: "pending" },
  });

  const totalPending = studentFees.reduce(
    (sum, sf) => sum + parseFloat(sf.amount),
    0
  );

  return {
    studentId: student.id, // để truyền vào create payment nè
    fullName: student.fullName, // để hiển thị tên sinh viên nè
    totalPending,
  };
};


// 6 Assign fees to student
export const assignFeesToStudent = async (mssv, fees) => {
  const student = await Student.findOne({ where: { mssv } });
  if (!student) {
    throw new ApiError(404, "Student not found", " Student with MSSV " + mssv + " does not exist");
  }
  for (const feeData of fees) {
    const fee = await Fee.findByPk(feeData.feeId);
    if (!fee) {
      throw new ApiError(404, "Fee not found", " Fee with ID " + feeData.feeId + " does not exist");
    }
    await StudentFee.create({
      studentId: student.id,
      feeId: fee.id,
      amount: feeData.amount,
      dueDate: feeData.dueDate,
      status: "pending",
    });
  }
  return await getFeesForStudent(mssv);
};

// 7 Update a particular student_fee
export const updateStudentFee = async (studentFeeId, updates) => {
  const studentFee = await StudentFee.findByPk(studentFeeId);
  if (!studentFee) {
    return null;
  }
  await studentFee.update(updates);
  return studentFee;
}

// 8 Get student_fee by id (optional)
export const getStudentFeeById = async (studentFeeId) => {
  return await StudentFee.findByPk(studentFeeId);
}

// 9 Get multiple student_fees by IDs (for payment validation)
export const getStudentFeesByIds = async (studentFeeIds) => {
  return await StudentFee.findAll({
    where: { id: studentFeeIds },
  });
};

// 10 Mark fees as paid (gọi từ payment service sau khi thanh toán thành công)
export const markFeesPaid = async (studentFeeIds) => {
  if (!studentFeeIds || studentFeeIds.length === 0) {
    throw new Error("No student fee IDs provided");
  }

  const fees = await StudentFee.findAll({ where: { id: studentFeeIds } });
  if (fees.length !== studentFeeIds.length) {
    throw new Error("Some student fees not found");
  }

  for (const fee of fees) {
    fee.status = "paid";
    await fee.save();
  }

  return fees;
};