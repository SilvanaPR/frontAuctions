"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentAuction } from "../../../lib/features/auction/auctionSlice";
import AuctionBid from "../../components/Auction/AuctionBid";
import { useParams } from "next/navigation";


export default function Bid() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params?.id;


    const currentAuction = useSelector((state) => state.auction.currentAuction)

    useEffect(() => {
        dispatch(getCurrentAuction(id))
    }, []);

    return <AuctionBid auction={currentAuction} />
}
