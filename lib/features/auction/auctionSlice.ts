import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthData } from '@/lib/utils/authHelpers';
import { apiAuction } from '@/lib/axios';


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
} = {
    auctions: [],
    currentAuction: {},
    loadingAuctions: false,
}


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
        debugger
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
                endDate: a.auctionFechaFin,
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
        { auctionId }: { auctionId: string },
        { rejectWithValue }
    ) => {
        try {
            const { userId } = getAuthData();
            const { data } = await apiAuction.get(
                `/auction/id//auctioneer/product/${auctionId}`
            );

            return {
                id: data.productId,
                name: data.productName,
                category: data.categoryId,
                price: data.productPrice,
                description: data.productDescription,
                image: data.productImage,
                stock: data.productStock,
                availability: data.productAvilability,
                user: data.productUserId,
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
            auctionEstado: "active",
            auctionUserId: userId,
            auctionProductId: auction.productId,
        }


        const { data } = await apiAuction.post(`/auction/addAuction/${userId}/${auction.productId}`, auctionToCreate);
        return data;
    }
);



export const auctionSlice = createSlice({
    name: 'auction',
    initialState,
    reducers: {
        deleteAuction: (state, action: PayloadAction<Auction>) => {
            state.auctions = state.auctions.filter(auction => auction.id !== action.payload.id);
        },
        getCurrentAuction: (state, action: PayloadAction<number>) => {
            const cur: number = state.auctions.length + 2
            state.currentAuction = { id: cur, name: "Reloj de Pulsera Antiguo", basePrice: 150, description: "Elegante reloj de pulsera antiguo de cuerda manual, funcionando perfectamente.", image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg", initDate: "2025-05-20T10:00:00-04:00", endDate: "2025-05-27T18:00:00-04:00", conditions: "Se vende tal cual se muestra en las imágenes. No se aceptan devoluciones.", minIncrement: 10, resPrice: 250, state: "activo", initHour: "10:00", endHour: "12:00" }
        },
        modifyAuction: (state, action: PayloadAction<Auction>) => {
            const index = state.auctions.findIndex(auction => auction.id === action.payload.id);
            if (index !== -1) {
                state.auctions[index] = action.payload;
            }
        }

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

    },
})

export const { deleteAuction, getCurrentAuction, modifyAuction } = auctionSlice.actions

export default auctionSlice.reducer