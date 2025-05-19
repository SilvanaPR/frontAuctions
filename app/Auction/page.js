"use client";
import React, { useState, useEffect } from "react";
import AuctionCard from "../components/AuctionCard";
import { useSelector, useDispatch } from 'react-redux';
import { getAuctions } from "../../lib/features/auction/auctionSlice";

export default function Auction() {
    const auctions = useSelector((state) => state.auction.auctions)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuctions())
    }, []);

    return (
        <section className="">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="">
                    {(auctions ?? []).map((auction) => (
                        <AuctionCard key={auction.id} auction={auction} />
                    ))}
                </div>
            </div>
        </section>
    );
}