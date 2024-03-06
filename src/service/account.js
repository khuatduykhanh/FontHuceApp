import axios from "axios"
// Khai báo hàm account mà không sử dụng useSelector ở đây
const account = axios.create({
    baseURL: "http:localhost:8080/api/account",
    headers: { "X-Requested-With": "XMLHttpRequest" },
    withCredentials: true,
});

export const checkToken = async (accessToken) => {
     // Sử dụng accessToken được truyền vào từ tham số
        const res = await account.get("/checkToken", {
            headers: { "Authorization": `Bearer ${accessToken}` },
            validateStatus: function (status) {
              return status < 500; // Chỉ phân giải nếu như mã trạng thái thấp hơn 500
            }
        });
        return res;
};

export const uploadAvatar = async (data,token) =>{
    const res = await account.post("/uploadImage", data,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },

    })
    return res;
};
export default { checkToken, uploadAvatar};
