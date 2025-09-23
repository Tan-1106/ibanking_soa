import { feeService } from "../services/fee.service.js";
import ApiResponse from "../utils/Api.response.js";

const feeController = {

  // 1 Create fee
  createFee: async (req, res) => {
    const { subject, amount, semester, year } = req.body;
    const newFee = await feeService.createFee({ subject, amount, semester, year });
    res.status(201).json(new ApiResponse(201, "Fee created successfully", newFee));
  },

  // 2 Get fee by ID
  getFee: async (req, res) => {
    const { id } = req.params;
    const fee = await feeService.getFeeById(id);
    res.status(200).json(new ApiResponse(200, "Fee fetched successfully", fee));
  },

  // 3 List all fees
  listFees: async (req, res) => {
    const fees = await feeService.listAllFees();
    res.status(200).json(new ApiResponse(200, "Fees fetched successfully", fees));
  },

  // 4 Update fee
  updateFee: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updatedFee = await feeService.updateFee(id, updates);
    if (!updatedFee) {
      throw new ApiError(404, "Fee not found", " Fee with ID " + id + " does not exist");
    }
    res.status(200).json(new ApiResponse(200, "Fee updated successfully", updatedFee));
  },

  // 5 Delete fee
  deleteFee: async (req, res) => {
    const { id } = req.params;
    const deleted = await feeService.deleteFee(id);
    if (!deleted) {
      throw new ApiError(404, "Fee not found", " Fee with ID " + id + " does not exist");
    }
    res.json(new ApiResponse(200, "Fee deleted successfully", deleted));
  },
};
export {
  feeController
}