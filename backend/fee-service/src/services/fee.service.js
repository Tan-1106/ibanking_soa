import Fee from "../models/fee.model.js";

export const registerFee = async (req, res) => {
  const { description, amout, semester, year } = req.body;
    try {
        const newFee = await Fee.create({ description, amout, semester, year });
        res.status(201).json(newFee);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getFee = async (req, res) => {
    try {
        const fees = await Fee.findAll();
        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getFeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const fee = await Fee.findByPk(id);
        if (!fee) return res.status(404).json({ message: "Fee not found" });
        res.status(200).json(fee);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateFee = async (req, res) => {
    const { id } = req.params;  
    const { description, amout, semester, year } = req.body;
    try {
        const fee = await Fee.findByPk(id);
        if (!fee) return res.status(404).json({ message: "Fee not found" });
        fee.description = description || fee.description;
        fee.amout = amout || fee.amout;
        fee.semester = semester || fee.semester;
        fee.year = year || fee.year;
        await fee.save();
        res.status(200).json(fee);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteFee = async (req, res) => {
    const { id } = req.params;
    try {
        const fee = await Fee.findByPk(id);
        if (!fee) return res.status(404).json({ message: "Fee not found" });
        await fee.destroy();
        res.status(200).json({ message: "Fee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};