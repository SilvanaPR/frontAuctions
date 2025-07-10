import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { apiUser } from '@/lib/axios';
import { getAuthData } from '@/lib/utils/authHelpers';


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
    currentUser: User,
    loadingUsers: boolean,
    loadingUser: boolean
} = {
    users: [],
    currentUser: {
        userId: '',
        userEmail: '',
        usersType: '',
        userPassword: '',
        userName: '',
        userPhone: '',
        userAddress: '',
        userAvailable: '',
        userLastName: '',
        userDelete: null
    },
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
    async () => {
        const { userId } = getAuthData();

        const { data } = await apiUser.get(`/user/users/${userId}`);
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

export const saveUser = createAsyncThunk(
  'user/saveUser',
  async (userData: User, { getState }) => {
    const { user } = getState() as { user: typeof initialState };
    const usersType = user.currentUser.usersType || userData.usersType;
    const edit = !!user.currentUser.userId;
    
    const endpoint = getEndpoint(usersType, edit);
    const apiMethod = edit ? 'put' : 'post';
    const { data } = await apiUser[apiMethod](endpoint + (edit ? user.currentUser.userId : ''), user.currentUser);

    return data;
  }
);


const getEndpoint = (usersType: string, edit: boolean) => {
    if (usersType === "Subastador") {
        if (edit) {
            return `/user/auctioneer/Update-Auctioneer/`;
        }
        return `/user/auctioneer/Auctioneer-Registration/`;
    } else if (usersType === 'Soporte') {
        if (edit) {
            return `/user/auctioneer/Update-Support/`;
        }
        return `/user/support/Support-Registration/`;
    } else if (usersType === 'Postor') {
        if (edit) {
            return `/user/bidder/Update-Bidder/`;
        }
        return `/user/bidder/Bidder-Registration/`;
    }
}


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