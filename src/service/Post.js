import axios from "axios"
// Khai báo hàm account mà không sử dụng useSelector ở đây
const account = axios.create({
    baseURL: "http:localhost:8080/api/post",
    headers: { "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});
export const post = async (data,token) =>{
    console.log("test",res)
    const res = await account.post("", data,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      validateStatus: function (status) {
        return status < 500; // Chỉ phân giải nếu như mã trạng thái thấp hơn 500
      }
    })
    console.log("test",res)
    return res;
};
export default {post};
