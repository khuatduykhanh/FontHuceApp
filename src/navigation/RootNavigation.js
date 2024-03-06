import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Authenticated, NonAuthenticated, SetupLogin } from './MainNavigation';
import { updateUser,logOut } from "../redux/reducers/User"
import { checkToken } from '../service/account';
import { refreshToken } from "../service/auth"
const RootNavigation = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const checkToken1 = async () => {
      try {
          const check = await checkToken(user.accessToken);
          if (check.status !== 200) {
              const refresh = await refreshToken({ token: user.refreshToken });
              if (refresh.status === 200 && refresh.data.status === 1) {
                  dispatch(updateUser(refresh.data.data));
              } else {
                  dispatch(logOut());
              }
          }
      } catch (error) {
          console.log("error", error);
          // Xử lý lỗi nếu có
      }
  };
  useEffect(() => {
    checkToken1();
  }, []); // Thêm dependency array trống để useEffect chỉ chạy một lần sau khi component được mount

  return (user.accessToken == undefined ? <NonAuthenticated /> /** : user.department == null ? <SetupLogin /> */ : <Authenticated />);
};

export default RootNavigation;
