"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from 'react-redux';
import { getAuctions } from "../../lib/features/auction/auctionSlice";

export default function Auction() {
    const auctions = useSelector((state) => state.auction.auction)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuctions())
    }, []);

    return (
        <section className="bg-gray-50 py-8 antialiased md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    {/*auctions.map((auction) => (
                        <ProductCard key={auction.id} auction={auction} />
                    ))*/}
                </div>
            </div>
        </section>
    );
}