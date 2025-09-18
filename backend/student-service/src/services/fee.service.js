import Fee from "../models/fee.model.js";

// 1 Create fee
export const createFee = async ({ description, amount, semester, year }) => {
  const newFee = await Fee.create({ description, amount, semester, year });
  return newFee;
};

// 2 Get fee by ID
export const getFeeById = async (id) => {
  return await Fee.findByPk(id);
}

// 3 List all fees
export const listAllFees = async () => {
  return await Fee.findAll();
};

// 4 Update fee
export const updateFee = async (id, updates) => {
  const fee = await Fee.findByPk(id);
  if (!fee) {
    return null;
  }
  await fee.update(updates);
  return fee;
}

// 5 Delete fee
export const deleteFee = async (id) => {
  const fee = await Fee.findByPk(id);
  if (!fee) {
    return false;
  }
  await fee.destroy();
  return true;
}