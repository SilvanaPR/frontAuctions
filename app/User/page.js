"use client";
import React, { useEffect } from "react";
import Configuration from "../components/User/Configuration";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from "../../lib/features/user/userSlice";

export default function UserConfiguration() {
  const dispatch = useDispatch();
  const userId = "7671574c-6fb8-43b7-98be-897a98c487a0";
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
        if (userId) {
            dispatch(fetchUser(userId));
        }
    }, [dispatch, userId]);

  return <Configuration user={user} />;
}