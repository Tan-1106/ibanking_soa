import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const newToken = await authService.refreshToken(req.body.token);
    res.json({ token: newToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};