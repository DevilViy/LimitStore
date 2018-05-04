import { get, post } from "./request";

export const userTest = () => {
    return get("/api/user/test");
};

export const sendSms = (body) => {
    return post("/send_sms",body);
};

export const sendSmsBack = (body) => {
    return post("/send_sms_back",body);
};

export const checkCode = (body) => {
    return post("/check_code",body);
};

export const checkCodeBack = (body) => {
    return post("/check_code_back",body);
};

export const register = (body) => {
    return post("/register",body);
};

export const login = (body) => {
    return post("/login",body);
};

export const modifyPassword = (body) => {
    return post("/modify_password",body)
}