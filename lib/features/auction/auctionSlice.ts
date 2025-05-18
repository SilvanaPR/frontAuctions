import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    auctions: [],
    currentAuction: {}
}

interface Auction {
    name: string,
    image: string,
    basePrice: number,
    resPrice: number,
    description: string,
    initDate: Date,
    endDate: Date,
    conditions: string,
    minIncrement: number,
    state?: string,
    id?: number
}


export const auctionSlice = createSlice({
    name: 'auction',
    initialState,
    reducers: {
        getAuctions: (state) => {
            state.auctions = [
                { name: "Reloj de Pulsera Antiguo", basePrice: 150, description: "Elegante reloj de pulsera antiguo de cuerda manual, funcionando perfectamente.", image: "reloj_antiguo.jpg", initDate: "2025-05-20T10:00:00-04:00", endDate: "2025-05-27T18:00:00-04:00", conditions: "Se vende tal cual se muestra en las imágenes. No se aceptan devoluciones.", minIncrement: 10, resPrice: 250, state: "activo", id: 1 },
                { name: "Pintura al Óleo - Paisaje Campestre", basePrice: 300, description: "Hermosa pintura al óleo sobre lienzo, representando un paisaje campestre al atardecer.", image: "pintura_oleo.jpg", initDate: "2025-05-21T14:30:00-04:00", endDate: "2025-05-28T20:00:00-04:00", conditions: "Obra original firmada por el artista. Marco incluido.", minIncrement: 20, resPrice: 500, state: "activo", id: 2 },
                { name: "Consola de Videojuegos Retro", basePrice: 80, description: "Consola de videojuegos clásica de los años 80, con dos controles y varios juegos.", image: "consola_retro.jpg", initDate: "2025-05-22T09:00:00-04:00", endDate: "2025-05-29T17:00:00-04:00", conditions: "Probada y funcionando correctamente. Cables y accesorios incluidos.", minIncrement: 5, resPrice: 120, state: "activo", id: 3 },
                { name: "Juego de Té de Porcelana Antigua", basePrice: 120, description: "Delicado juego de té de porcelana fina con detalles dorados. Incluye tetera, azucarera, lechera y seis tazas con sus platos.", image: "juego_te_porcelana.jpg", initDate: "2025-05-23T11:45:00-04:00", endDate: "2025-05-30T19:30:00-04:00", conditions: "Algunas piezas pueden presentar pequeños signos de antigüedad. Ver fotos detalladamente.", minIncrement: 8, resPrice: 200, state: "activo", id: 4 },
                { name: "Lote de Monedas Antiguas", basePrice: 50, description: "Colección de diez monedas antiguas de diferentes países y épocas.", image: "monedas_antiguas.jpg", initDate: "2025-05-24T16:00:00-04:00", endDate: "2025-05-31T21:00:00-04:00", conditions: "Se venden como lote. La autenticidad de cada moneda no ha sido verificada por un experto.", minIncrement: 3, resPrice: 80, state: "activo", id: 5 }
            ]
        },
        addAuction: (state, action: PayloadAction<Auction>) => {
            state.auctions = [...state.auctions, action.payload]
        },
    },
})

// Action creators are generated for each case reducer function
export const { getAuctions, addAuction } = auctionSlice.actions

export default auctionSlice.reducer