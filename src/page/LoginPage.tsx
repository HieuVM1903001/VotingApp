import { Select, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser } from "../reducer/userSlice";
import { useNavigate } from "react-router-dom";
import React from 'react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const users = useAppSelector((store) => store.user.users);
  const dispatch = useAppDispatch();

  const onUserSelect = (userId: string) => {
    const selectedUser = users.find(x => x.id === userId);
    if (selectedUser) {
      dispatch(setUser(selectedUser));
      navigate("/home");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto", textAlign: "center" }}>
      <Typography.Title level={4}>Select a User to Login</Typography.Title>
      <Select
        placeholder="Select a user"
        options={users.map(x => ({ value: x.id, label: x.name }))}
        onChange={onUserSelect}
        style={{ width: "100%" }}
        showSearch
        optionFilterProp="label"
      />
    </div>
  );
};
