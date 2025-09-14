import * as feeService from "../services/fee.service.js";
import ApiResponse from "../utils/Api.response.js";

// 1 Create fee
export const createFee = async (req, res) => {
  const { type, amount, description } = req.body;
  const newFee = await feeService.createFee({ type, amount, description });
  res.status(201).json(new ApiResponse(201, "Fee created successfully", newFee));
};

// 2 Get fee by ID
export const getFee = async (req, res) => {
  const { id } = req.params;
  const fee = await feeService.getFeeById(id);
  if (!fee) {
    throw new ApiError(404, "Fee not found", " Fee with ID " + id + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "Fee fetched successfully", fee));
};

// 3 List all fees
export const listFees = async (req, res) => {
  const fees = await feeService.listAllFees();
  res.status(200).json(new ApiResponse(200, "Fees fetched successfully", fees));
};

// 4 Update fee
export const updateFee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedFee = await feeService.updateFee(id, updates);
  if (!updatedFee) {
    throw new ApiError(404, "Fee not found", " Fee with ID " + id + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "Fee updated successfully", updatedFee));
};

// 5 Delete fee
export const deleteFee = async (req, res) => {
  const { id } = req.params;
  const deleted = await feeService.deleteFee(id);
  if (!deleted) {
    throw new ApiError(404, "Fee not found", " Fee with ID " + id + " does not exist");
  }
  res.json(new ApiResponse(200, "Fee deleted successfully", deleted));
};