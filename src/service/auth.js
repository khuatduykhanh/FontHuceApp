import axios from "axios";

const auth = axios.create({
    baseURL: "http:localhost:8080/api/auth",
    headers: { "X-Requested-With": "XMLHttpRequest" },
    withCredentials: true,
  });

export const register = async (data) => {
    const res = await auth.post("/signup", data);
    return res;
};

export const verifyEmail = async (opt) => {
    const res = await auth.put(`/verifyEmail/${opt}`);
    return res;
};

export const sendVerifyEmail = async (email) => {
    const params = { email };
    const res = await auth.get("/sendVerifyEmail", { params });
    return res;
};

export const forgotPassword = async (email) => {
    const res = await auth.post(`/forgotPassword/${email}`);
    return res;
};

export const verifyTokenPassword = async (opt) => {
    const res = await auth.get(`/verifyForgotPassword/${opt}`);
    return res;
};

export const sendVerifyTokenPassword = async (email) => {
    const params = { email };
    const res = await auth.get("/sendVerifyTokenPassword", { params });
    return res;
};

export const verifyForgotPassword = async (token,data) => {
    const res = await auth.put(`/verifyForgotPassword/${token}`, data);
    return res;
};

export const login = async (data) => {
    const res = await auth.post("/signin", data);
    return res;
};

export const refreshToken = async (data) => {
    const res = await auth.post("/refreshToken", data, {
        validateStatus: function (status) {
            return status < 500; // Chỉ phân giải nếu như mã trạng thái thấp hơn 500
        }
    });
    return res;
};
export default {register,verifyEmail, forgotPassword,verifyForgotPassword,login,refreshToken}