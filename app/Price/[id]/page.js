"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuction } from "../../../lib/features/auction/auctionSlice";
import { useParams, useSearchParams } from "next/navigation";
import PriceView from "../../components/Price/PriceView";

export default function PriceDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params?.id;
    const context = searchParams.get("context");

    const currentAuction = useSelector((state) => state.auction.currentAuction)

    useEffect(() => {
        dispatch(fetchAuction(id));

    }, [id]);

    return <PriceView auction={currentAuction} id={id} context={context} />
}
