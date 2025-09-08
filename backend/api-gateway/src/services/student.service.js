import axios from "axios";

const STUDENT_URL = "http://localhost:4003";

export const getStudentByMssv = (mssv, token) =>
  axios.get(`${STUDENT_URL}/students/${mssv}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);

export const updateStudentFee = (studentFeeId, updates, token) =>
  axios.put(`${STUDENT_URL}/studentFees/${studentFeeId}`, updates, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);