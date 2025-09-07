import Student from "../models/student.model.js";
import Fee from "../models/fee.model.js";
import StudentFee from "../models/studentFee.model.js";

// 1 Create student
export const createStudent = async ({ mssv, name, email }) => {
  const newStudent = await Student.create({ mssv, name, email });
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

// 5 Get fees for student
export const getFeesForStudent = async (mssv) => {
  const student = await Student.findOne({
    where: { mssv },
    include: {
      model: Fee,
        through: { attributes: ['id', 'status', 'dueDate'] },
    },
  });
    if (!student) {
        return null;
    }
    return student.Fees;
}

// 6 Assign fees to student
export const assignFeesToStudent = async (mssv, fees) => {
  const student = await Student.findOne({ where: { mssv } });
    if (!student) {
        throw new Error("Student not found");
    }
    for (const feeData of fees) {
        const fee = await Fee.findByPk(feeData.feeId);
        if (!fee) {
            throw new Error(`Fee with ID ${feeData.feeId} not found`);
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