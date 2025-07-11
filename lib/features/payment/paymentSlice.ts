import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiPayments } from '@/lib/axios';
import { getAuthData } from '@/lib/utils/authHelpers';

interface Payment {
    id: string;
    amount: number;
    status: string;
    userId: string;
    // Add more fields as needed
}

const initialState: {
    payments: Payment[];
    cards: any[];
    currentPayment: Payment | null;
    loadingPayments: boolean;
    loadingPayment: boolean;
    loadingCreatePayment: boolean;
    loadingUpdatePayment: boolean;
    loadingDeletePayment: boolean;
} = {
    payments: [],
    cards: [],
    currentPayment: null,
    loadingPayments: false,
    loadingPayment: false,
    loadingCreatePayment: false,
    loadingUpdatePayment: false,
    loadingDeletePayment: false,
};

export const fetchPayments = createAsyncThunk(
    'payments/fetchPayments',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiPayments.get('/payments');
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchPayment = createAsyncThunk(
    'payments/fetchPayment',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await apiPayments.get(`/payments/${id}`);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const createPayment = createAsyncThunk(
    'payments/createPayment',
    async (payment: Payment, { rejectWithValue }) => {
        try {
            const { data } = await apiPayments.post('/payments', payment);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const updatePayment = createAsyncThunk(
    'payments/updatePayment',
    async (payment: Payment, { rejectWithValue }) => {
        try {
            const { data } = await apiPayments.put(`/payments/${payment.id}`, payment);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const deletePayment = createAsyncThunk(
    'payments/deletePayment',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await apiPayments.delete(`/payments/${id}`);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const saveCard = createAsyncThunk(
    'payments/saveCard',
    async (
        cardData: any,
        { rejectWithValue }
    ) => {
        try {
            const { userId } = getAuthData();
            const objectToSave = {
                ...cardData,
                cardUserId: userId,
            }
            const { data } = await apiPayments.post(`/payment/SaveCard/${userId}`, objectToSave);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchCards = createAsyncThunk(
    'payments/fetchCards',
    async (
        cardData: any,
        { rejectWithValue }
    ) => {
        try {
            const { userId } = getAuthData();
            const { data } = await apiPayments.get(`/payment/Card-All/?userId=${userId}`);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.loadingPayments = true;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.loadingPayments = false;
                state.payments = action.payload;
            })
            .addCase(fetchPayments.rejected, (state) => {
                state.loadingPayments = false;
            })

            .addCase(fetchPayment.pending, (state) => {
                state.loadingPayment = true;
            })
            .addCase(fetchPayment.fulfilled, (state, action) => {
                state.loadingPayment = false;
                state.currentPayment = action.payload;
            })
            .addCase(fetchPayment.rejected, (state) => {
                state.loadingPayment = false;
            })

            .addCase(createPayment.pending, (state) => {
                state.loadingCreatePayment = true;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.loadingCreatePayment = false;
                state.currentPayment = action.payload;
            })
            .addCase(createPayment.rejected, (state) => {
                state.loadingCreatePayment = false;
            })

            .addCase(updatePayment.pending, (state) => {
                state.loadingUpdatePayment = true;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.loadingUpdatePayment = false;
                state.currentPayment = action.payload;
            })
            .addCase(updatePayment.rejected, (state) => {
                state.loadingUpdatePayment = false;
            })

            .addCase(deletePayment.pending, (state) => {
                state.loadingDeletePayment = true;
            })
            .addCase(deletePayment.fulfilled, (state, action) => {
                state.loadingDeletePayment = false;
                state.currentPayment = null;
            })
            .addCase(deletePayment.rejected, (state) => {
                state.loadingDeletePayment = false;
            })
            .addCase(saveCard.pending, (state) => {
                state.loadingCreatePayment = true;
            })
            .addCase(saveCard.fulfilled, (state, action) => {
                state.loadingCreatePayment = false;
                // Optionally update state with returned card info
            })
            .addCase(saveCard.rejected, (state) => {
                state.loadingCreatePayment = false;
            })
            .addCase(fetchCards.pending, (state) => {
                state.loadingCreatePayment = true;
            }).addCase(fetchCards.fulfilled, (state, action) => {
                state.loadingCreatePayment = false;
                state.cards = action.payload;
            });
    },
});

export default paymentsSlice.reducer;