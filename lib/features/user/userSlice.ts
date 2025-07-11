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
    activityHistory: any[],
    loadingUsers: boolean,
    loadingUser: boolean,
    loadingRoles: boolean,
    roles: any[],
    loadingPermissions: boolean,
    permissions: any[],
    // Add new state for role-permission assignments
    rolePermissions: any[],
    loadingRolePermissions: boolean,
    errorRolePermissions: string | null,
} = {
    users: [],
    activityHistory: [],
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
    loadingUser: false,
    loadingRoles: false,
    roles: [],
    loadingPermissions: false,
    permissions: [],
    // Add new state for role-permission assignments
    rolePermissions: [],
    loadingRolePermissions: false,
    errorRolePermissions: null,
}

interface Bidder {
  userEmail: string,
  userName: string,
  userLastName: string,
  userPhone: string,
  userAddress: string,
  userPassword: string,
  bidderDni: string,
  bidderBirthday: Date
}
interface Support {
  userEmail: string,
  userName: string,
  userLastName: string,
  userPhone: string,
  userAddress: string,
  userPassword: string,
  supportDni: string,
  supportSpecialization: Date
}
interface Auctioneer {
  userEmail: string,
  userName: string,
  userLastName: string,
  userPhone: string,
  userAddress: string,
  userPassword: string,
  bidderDni: string,
  bidderBirthday: Date
}

export const createBidder = createAsyncThunk(
  'product/createBidder',
  async (
    { bidder }: { bidder: Bidder },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiUser.post(
        `/user/bidder/Bidder-Registration`,
        { ...bidder}
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createAuctioneer = createAsyncThunk(
  'product/createAuctioneer',
  async (
    { bidder }: { bidder: Bidder },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiUser.post(
        `/user/bidder/Bidder-Registration`,
        { ...bidder}
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createSupport = createAsyncThunk(
  'product/createSupport',
  async (
    { bidder }: { bidder: Bidder },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiUser.post(
        `/user/bidder/Bidder-Registration`,
        { ...bidder}
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

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

export const fetchActivityHistory = createAsyncThunk(
    'user/fetchActivityHistory',
    async () => {
        const { userId } = getAuthData();
        const { data } = await apiUser.get(`/user/activity-history/UserId/${userId}?`);
        return data;
})


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        const { userId } = getAuthData();

        const { data } = await apiUser.get(`/user/users/${userId}`);

        let request;

        if (data.usersType === Subastador) {
            request = await apiUser.get(`/user/auctioneer/${userId}`);
            request = request.data;
            data.dni = request.auctioneerDni;

        } else if (data.usersType === "Postor") {
            request = await apiUser.get(`/user/bidder/${userId}`);
            request = request.data;
            data.dni = request.bidderDni;

        } else {
            request = await apiUser.get(`/user/support/${userId}`);
            request = request.data;
            data.dni = request.supportDni;

        }

        const parsedUser = parseKeysByType(data, request);

        return {
            userId: parsedUser.userId,
            userEmail: parsedUser.userEmail,
            usersType: parsedUser.usersType,
            userName: parsedUser.userName,
            userPhone: parsedUser.userPhone,
            userAddress: parsedUser.userAddress,
            userAvailable: parsedUser.userAvailable,
            userLastName: parsedUser.userLastName,
            userDelete: parsedUser.userDelete,
            dni: parsedUser.dni,
        };
    }
);

const parseKeysByType = (userData: User, typeData: any) => {
    if (userData.usersType === "Subastador") {
        return {
            ...userData,
            auctioneerDni: userData.dni,
            birthday: typeData.auctioneerBirthday,

        }
    } else if (userData.usersType === "Postor") {
        return {
            ...userData,
            bidderDni: userData.dni,
            birthday: typeData.auctioneerBirthday,
        }
    } else {
        return {
            ...userData,
            supportDni: userData.dni,
            birthday: typeData.supportBirthday,
        };
    }
}

const customFieldsForCreate = (userData: any) => {
    if (userData.usersType === "Subastador") {
        return {
            ...userData,
            supportBirthday: userData.birthday,
            supportDni: userData.dni,
        }
    } else if (userData.usersType === "Postor") {
        return {
            ...userData,
            bidderDni: userData.dni,
            birthday: userData.birthday,
        }
    } else {
        return {
            ...userData,
            supportDni: userData.dni,
        }
    }
}

export const saveUser = createAsyncThunk(
  'user/saveUser',
  async (userData: User, { getState }) => {
    const { user } = getState() as { user: typeof initialState };
    const usersType = user.currentUser.usersType || userData.usersType;
    const edit = !!user.currentUser.userId;
    
    const endpoint = getEndpoint(usersType, edit);

    const userToCreate = customFieldsForCreate({
        ...userData,
        userId: userData.userId,
        userEmail: userData.userEmail,
        usersType: userData.usersType,
        userPassword: userData.userPassword,
        userName: userData.userName,
    })



    const apiMethod = edit ? 'put' : 'post';
    const { data } = await apiUser[apiMethod](endpoint + (edit ? user.currentUser.userId : ''), userToCreate);

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

export const fetchRoles = createAsyncThunk(
    'user/fetchRoles',
    async () => {
        const { data } = await apiUser.get(`/user/RoleManagement/Roles-All`);
        return data;
    }
)

export const fetchPermissions = createAsyncThunk(
    'user/fetchPermissions',
    async () => {
        const { data } = await apiUser.get(`/user/RoleManagement/Permission-All`);
        return data;
    }
);

// Fetch all role-permission assignments
export const fetchRolePermissions = createAsyncThunk(
    'user/fetchRolePermissions',
    async () => {
        const { data } = await apiUser.get('/user/RoleManagement/Roles-Permissions-All');
        return data;
    }
);

// Assign a permission to a role
export const assignPermissionToRole = createAsyncThunk(
    'user/assignPermissionToRole',
    async ({ roleId, permissionId }: { roleId: string, permissionId: string }) => {
        const { data } = await apiUser.post('/user/RoleManagement/Assign-Permission-Role', {
            roleId,
            permissionId
        });
        return data;
    }
);

// Unassign a permission from a role
export const unassignPermissionFromRole = createAsyncThunk(
    'user/unassignPermissionFromRole',
    async (rolePermissionId: string) => {
        await apiUser.delete(`/user/RoleManagement/Unassign-Permission-To-Role/${rolePermissionId}`);
        return rolePermissionId;
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
            })
            .addCase(fetchActivityHistory.pending, (state) => {
                state.loadingActivityHistory = true;
            })
            .addCase(fetchActivityHistory.fulfilled, (state, action) => {
                state.loadingActivityHistory = false;
                state.activityHistory = action.payload;
            })
            .addCase(fetchRoles.pending, (state) => {
                state.loadingRoles = true;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loadingRoles = false;
                state.roles = action.payload;
            })
            .addCase(fetchPermissions.pending, (state) => {
                state.loadingPermissions = true;
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.loadingPermissions = false;
                state.permissions = action.payload;
            })
            .addCase(fetchPermissions.rejected, (state) => {
                state.loadingPermissions = false;
            })
            // Role-permission assignments
            .addCase(fetchRolePermissions.pending, (state) => {
                state.loadingRolePermissions = true;
                state.errorRolePermissions = null;
            })
            .addCase(fetchRolePermissions.fulfilled, (state, action) => {
                state.loadingRolePermissions = false;
                state.rolePermissions = action.payload;
            })
            .addCase(fetchRolePermissions.rejected, (state, action) => {
                state.loadingRolePermissions = false;
                state.errorRolePermissions = action.error.message;
            })
            .addCase(assignPermissionToRole.fulfilled, (state, action) => {
                // Optionally, push the new assignment to state.rolePermissions
                state.rolePermissions.push(action.payload);
            })
            .addCase(unassignPermissionFromRole.fulfilled, (state, action) => {
                // Remove the assignment from state.rolePermissions
                state.rolePermissions = state.rolePermissions.filter(
                    (rp: any) => rp.id !== action.payload
                );
            });
    },
})




export default userSlice.reducer