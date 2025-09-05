import * as feeService from "../services/fee.service.js";

export const registerFee = async (req, res) => {
  try {
    const fee = await feeService.registerFee(req.body);
    res.status(201).json({ feeId: fee.id, message: "Fee registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getFee = async (req, res) => {
  try {
    const fees = await feeService.getFee();
    res.json(fees);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getFeeById = async (req, res) => {
  try {
    const fee = await feeService.getFeeById(req.params.id);
    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFee = async (req, res) => {
    try {
        const updated = await feeService.updateFee(req.params.id, req.body);
        res.json({ success: true, updatedFee: updated });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteFee = async (req, res) => {
    try {
        await feeService.deleteFee(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};