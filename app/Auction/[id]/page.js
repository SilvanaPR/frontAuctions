"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentAuction } from "../../../lib/features/auction/auctionSlice";

import AuctionView from "../../components/Auction/AuctionView";

export default function Manage({ params }) {
    const dispatch = useDispatch();
    const { id } = React.use(params);


    const currentAuction = useSelector((state) => state.auction.currentAuction)

    useEffect(() => {
        dispatch(getCurrentAuction(id))
    }, []);

    return <AuctionView auction={currentAuction} />
}
