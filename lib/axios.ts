import axios from 'axios';

export const apiProduct = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_PRODUCT,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export const apiAuction = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_AUCTION,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});


export const apiUser = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_USER,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

