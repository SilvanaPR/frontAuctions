"use client";
import React, { useEffect } from "react";
import Configuration from "../components/User/Configuration";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from "../../lib/features/user/userSlice";

export default function UserConfiguration() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return <Configuration user={user} />;
}