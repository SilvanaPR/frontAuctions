import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { apiUser } from '@/lib/axios';


interface User {
    userId: string,
    userEmail: string,
    usersType: string,
    userPassword: string,
    userName: string,
    userPhone: string,
    userAddress: string,
    userAvailable: string,
    userLastName: string,
    userDelete: boolean
}

const initialState: {
    users: User[],
    currentUser: {},
    loadingUsers: boolean,
    loadingUser: boolean
} = {
    users: [],
    currentUser: {},
    loadingUsers: false,
    loadingUser: false
}


export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        const { data } = await apiUser.get('/user/users/All');
        return data.map((u: any) => {
            return {
                userId: u.userId,
                userEmail: u.userEmail,
                usersType: u.usersType,
                userPassword: u.userPassword,
                userName: u.userName,
                userPhone: u.userPhone,
                userAddress: u.userAddress,
                userAvailable: u.userAvailable,
                userLastName: u.userLastName,
                userDelete: u.userDelete
            };
        });
    }
);


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userId: string) => {
        const { data } = await apiUser.get(`/user/users/${userId}`);
        console.log(data)
        return {
            userId: data.userId,
            userEmail: data.userEmail,
            usersType: data.usersType,
            userPassword: data.userPassword,
            userName: data.userName,
            userPhone: data.userPhone,
            userAddress: data.userAddress,
            userAvailable: data.userAvailable,
            userLastName: data.userLastName,
            userDelete: data.userDelete
        };
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loadingUsers = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loadingUsers = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loadingUsers = false;
                console.error('Error fetching users:', action.error.message);
            })

            .addCase(fetchUser.pending, (state) => {
                state.loadingUser = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loadingUser = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loadingUser = false;
                console.error('Error fetching users:', action.error.message);
            });
    },
})


export default userSlice.reducer