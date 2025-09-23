import Fee from "../models/fee.model.js";
import ApiError from "../utils/ApiError.js";
const feeService = {
  // 1 Create fee
  createFee: async ({ subject, amount, semester, year }) => {
    const newFee = await Fee.create({ subject, amount, semester, year });
    console.log(newFee)
    return newFee;
  },

  // 2 Get fee by ID
  getFeeById: async (id) => {
    return await Fee.findByPk(id);
  },

  // 3 List all fees
  listAllFees: async () => {
    return await Fee.findAll();
  },

  // 4 Update fee
  updateFee: async (id, updates) => {
    const fee = await Fee.findByPk(id);
    if (!fee) {
      throw new ApiError(404, "Not found", `Fee with id ${id} not found`);
    }
    await fee.update(updates);
    return fee;
  },

  // 5 Delete fee
  deleteFee: async (id) => {
    const fee = await Fee.findByPk(id);
    if (!fee) {
      throw new ApiError(404, "Not found", `Fee with id ${id} not found`);
    }
    await fee.destroy();
    return true;
  }
};
export {
  feeService
}