import * as feeService from "../services/fee.service.js";

// 1 Create fee
export const createFee = async (req, res) => {
  try {
    const { type, amount, description } = req.body;
    const newFee = await feeService.createFee({ type, amount, description });
    res.status(201).json({ message: "Fee created successfully", feeId: newFee.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2 Get fee by ID
export const getFee = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await feeService.getFeeById(id);
    if (!fee) {
      return res.status(404).json({ error: "Fee not found" });
    }
    res.json(fee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3 List all fees
export const listFees = async (req, res) => {
  try {
    const fees = await feeService.listAllFees();
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4 Update fee
export const updateFee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedFee = await feeService.updateFee(id, updates);
    if (!updatedFee) {
      return res.status(404).json({ error: "Fee not found" });
    }
    res.json({ message: "Fee updated successfully", fee: updatedFee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 5 Delete fee
export const deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await feeService.deleteFee(id);
    if (!deleted) {
      return res.status(404).json({ error: "Fee not found" });
    }
    res.json({ message: "Fee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};