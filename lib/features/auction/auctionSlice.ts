import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthData } from '@/lib/utils/authHelpers';
import { apiAuction, apiBid } from '@/lib/axios';


interface Auction {
    name: string,
    image: string,
    basePrice: number,
    resPrice: number,
    description: string,
    conditions: string,
    initDate: Date,
    endDate: Date,
    initHour: '00:00',
    endHour: '00:00',
    minIncrement: number,
    state?: string,
    id?: number,
    prodQuantity: number,
    userId: string,
    productId: string
}

const initialState: {
    auctions: Auction[],
    currentAuction: {},
    loadingAuctions: boolean,
    currentBids: Bid[],
} = {
    auctions: [],
    currentAuction: {},
    loadingAuctions: false,
    currentBids: []
}

interface Bid {
    auctionId: string;
    amount: number;
    bidTime: string;
    amountMax?: number;
    increment?: number;
}

export const bidAuction = createAsyncThunk(
    'auction/bidAuction',
    async (bid: Bid) => {
        const { userId } = getAuthData();
        const bidToCreate = {
            "bidAuctionId": bid.auctionId,
            "bidUserId": userId,
            "amount": bid.amount,
        }

        const { data } = await apiBid.post(`/bid/Add-Bid/${userId}`, bidToCreate);
        return data;
})

export const bidAuctionAutomatic = createAsyncThunk(
    'auction/bidAuctionAutomatic',
    async (bid: Bid) => {
        debugger
        const { userId } = getAuthData();
        const bidToCreate = {
            "bidAuctionId": bid.auctionId,
            "bidUserId": userId,
            "amount": bid.amount,
            "amountMax": bid.amountMax,
            "increment": bid.increment
        }

        const { data } = await apiBid.post(`/bid/Add-BidAutomatic/${userId}`, bidToCreate);
        return data;
})

export const fetchBidAuctions = createAsyncThunk(
    'auction/fetchBidAuctions',
    async (state: string) => {
        const { userId } = getAuthData();
        const { data } = await apiBid.get(`/bid/Get-Bid-Filtered?userId=${userId}&status=${state}`);
        return Array.isArray(data) ? data : [];
    }
)

export const fetchAuctions = createAsyncThunk(
    'auction/fetchAuctions',
    async (state?: string) => {
        const { userId } = getAuthData();
        let request = {}
        if (state) {
            request = await apiAuction.get(`/auction/state/${state}`);
        } else {
            request = await apiAuction.get(`/auction?userId=${userId}`);
        }
        return request.data.map((a: any) => {
            const initDateObj = new Date(a.auctionFechaInicio);
            const endDateObj = new Date(a.auctionFechaFin);

            const pad = (n: number) => n.toString().padStart(2, '0');

            const formatTime = (d: Date) =>
                `${pad(d.getHours())}:${pad(d.getMinutes())}`;

            const formatDate = (d: Date) =>
                `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

            return {
                id: a.auctionId,
                name: a.auctionName,
                image: a.auctionImage,
                basePrice: a.auctionPriceBase,
                resPrice: a.auctionPriceReserva,
                description: a.auctionDescription,
                minIncrement: a.auctionIncremento,
                initDate: formatDate(initDateObj),
                endDate: formatDate(endDateObj),
                initHour: formatTime(initDateObj),
                endHour: formatTime(endDateObj),
                conditions: a.auctionCondiciones,
                prodQuantity: a.auctionCantidadProducto,
                userId: a.auctionUserId,
                productId: a.auctionProductId,
            };
        });
    }
);

export const fetchAuction = createAsyncThunk(
    'auction/fetchSingleAuction',
    async (
        auctionId: string,
        { rejectWithValue }
    ) => {
        try {
            const { userId } = getAuthData();
            const { data } = await apiAuction.get(
                `/auction/id/${auctionId}`
            );

            return {
               ...data,
            };
        } catch (error) {
            return rejectWithValue(err.message);
        }
    }
);

export const createAuction = createAsyncThunk(
    'auction/createAuction',
    async (auction: Auction) => {

        const { userId } = getAuthData();

        const  auctionToCreate = {
            auctionImage: auction.image,
            auctionPriceBase: auction.basePrice,
            auctionPriceReserva: auction.resPrice,
            auctionName: auction.name,
            auctionDescription: auction.description,
            auctionIncremento: auction.minIncrement,
            auctionFechaInicio: new Date(auction.initDate).toISOString(),
            auctionFechaFin: new Date(auction.endDate).toISOString(),
            auctionCondiciones: auction.conditions,
            auctionCantidadProducto: auction.prodQuantity,
            auctionEstado: "pending",
            auctionUserId: userId,
            auctionProductId: auction.productId,
        }


        const { data } = await apiAuction.post(`/auction/addAuction/${userId}/${auction.productId}`, auctionToCreate);
        return data;
    }
);

export const modifyAuction = createAsyncThunk(
    'auction/modifyAuction',
    async (auction: Auction) => {

        const { userId } = getAuthData();

        const  auctionToCreate = {
            auctionImage: auction.image,
            auctionPriceBase: auction.basePrice,
            auctionPriceReserva: auction.resPrice,
            auctionName: auction.name,
            auctionDescription: auction.description,
            auctionIncremento: auction.minIncrement,
            auctionFechaInicio: combineDateAndTime(auction.initDate, auction.initHour),
            auctionFechaFin: combineDateAndTime(auction.endDate, auction.endHour),
            auctionCondiciones: auction.conditions,
            auctionCantidadProducto: auction.prodQuantity,
            auctionEstado: "pending",
            auctionUserId: userId,
            auctionProductId: auction.productId,
            auctionId: auction.auctionId
        }


        const { data } = await apiAuction.put(`/auction/${auction.auctionId}?userId=${userId}`, auctionToCreate);
        return data;
    }
);

export const deleteAuction = createAsyncThunk(
    'auction/deleteAuction',
    async (auctionId: string) => { 
        
        const { userId } = getAuthData();
        const { data } = await apiAuction.delete(`/auction/${auctionId}?userId=${userId}`);
        console.log(data)
        return data;
    }
);

export const fetchFilteredBids = createAsyncThunk(
  'auction/fetchFilteredBids',
  async (auctionId) => {
    const { data } = await apiBid.get(`/bid/Get-Bid-Filtered?auctionId=${auctionId}`);
    // Ensure data is always an array
    return Array.isArray(data) ? data : [];
  }
);

const combineDateAndTime = (date, time) => {
    if (!date || !time) return '';
    // Crea un objeto Date en local y lo convierte a ISO string (UTC)
    const localDate = new Date(`${date}T${time}:00`);
    return localDate.toISOString(); // Esto da "2025-06-29T14:30:00.000Z"
};

export const auctionSlice = createSlice({
    name: 'auction',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuctions.pending, (state) => {
                state.loadingAuctions = true;
            })
            .addCase(fetchAuctions.fulfilled, (state, action) => {
                state.loadingAuctions = false;
                state.auctions = action.payload;
            })
            .addCase(fetchAuctions.rejected, (state, action) => {
                state.loadingAuctions = false;
                console.error('Error fetching acutions:', action.error.message);
            })
            .addCase(createAuction.pending, (state) => {
                state.loadingAuctions = true;
            })
            .addCase(createAuction.fulfilled, (state, action) => {
                state.loadingAuctions = false;
                state.auctions = [...state.auctions, action.payload];
            })
            .addCase(createAuction.rejected, (state, action) => {
                state.loadingAuctions = false;
                console.error('Error creating auction:', action.error.message);
            })
            .addCase(bidAuction.pending, (state) => {
                state.loadingAuctions = true;
            })
            .addCase(fetchFilteredBids.fulfilled, (state, action) => {
                state.currentBids = action.payload;
            })
            .addCase(fetchAuction.fulfilled, (state, action) => {
                state.currentAuction = action.payload;
            })
            .addCase(fetchBidAuctions.fulfilled, (state, action) => {
                state.auctions = action.payload;
            })
    },
})


export default auctionSlice.reducer