"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addAuction, fetchFilteredBids, modifyAuction } from "../../../lib/features/auction/auctionSlice";
import { fetchProducts } from "../../../lib/features/product/productSlice";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Datepicker } from 'flowbite';
import ConfirmationModal from "../ConfirmationModal";
import BidModal from "./BidModal";
import { ToastContainer, toast } from 'react-toastify';

export default function AuctionBid(props) {

    const loadingAuction = useSelector((state) => state.auction.loadingAuction);
    const [showManual, setShowManual] = useState(false);
    const [showAuto, setShowAuto] = useState(false);
    const dispatch = useDispatch();
    const currentBids = useSelector((state) => state.auction.currentBids);
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        dispatch(fetchFilteredBids(props.id))
    }, [])


    useEffect(() => {
        const hBid = currentBids.reduce((max, bid) => bid.amount > max.amount ? bid : max, currentBids[0]);
        setCurrentValue(hBid?.amount ?? props.auction?.basePrice);
    }, [currentBids])


    if (loadingAuction) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-brand border-e-transparent align-[-0.125em] text-brand" role="status">
                    <span className="sr-only">Cargando subasta...</span>
                </div>
            </div>
        );
    }

    return (

        <div className="items-center justify-center h-screen w-full">
            <section className="py-8 bg-white md:py-16 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">

                    <div className="place-content-end">
                        <Link href={`/AuctionClient`} className="pt-3 lg:inline-flex mt-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </Link>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">



                        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                            <img className=" w-full " src={props.auction?.image} />
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1
                                className="text-xl font-semibold text-gray-900 sm:text-2xl mb-4"
                            >
                                {props.auction?.name}
                            </h1>
                            <div className="mb-4">
                                <p className="text-m text-gray-900 sm:text-lg">Cantidad</p>
                                <p className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                    {props.auction?.productStock}
                                </p>
                            </div>

                            <div>
                                <p className="mb-6 text-gray-500 ">
                                    {props.auction?.description}
                                </p>
                            </div>

                            <div>
                                <p className="mb-6 text-gray-500 ">
                                    {props.auction?.conditions}
                                </p>
                            </div>

                            <div className="flex gap-10 mb-4">
                                <div className="flex flex-col items-center">
                                    <p className="text-m text-gray-900 sm:text-lg">Precio Base</p>
                                    <p className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                        {currentValue}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <p className="text-m text-gray-900 sm:text-lg">Incremento Minimo</p>
                                    <p className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                        {props.auction?.minIncrement}
                                    </p>
                                </div>
                            </div>



                            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">

                                <button onClick={() => setShowManual(true)}
                                    className="text-white mt-4 sm:mt-0 bg-brand hover:bg-brandLight focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center">
                                    Puja Manual
                                </button>

                                <button onClick={() => setShowAuto(true)}
                                    className="text-white mt-4 sm:mt-0 bg-brand hover:bg-brandLight focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center">
                                    Puja Automatica
                                </button>

                            </div>

                            <hr className="my-6 md:my-8 border-gray-200 " />
                            <div className="mb-4 flex gap-10">
                                <label className="text-lg text-gray-900 sm:text-xl">
                                    Fecha de Inicio

                                    <p className="text-base font-bold text-gray-900">
                                        {`${new Date(props.auction.initDate).toLocaleDateString()} ${props.auction.initHour}`}

                                    </p>

                                </label>

                                <label className="text-lg text-gray-900 sm:text-xl">
                                    Fecha Fin

                                    <p className="text-base font-bold text-gray-900">
                                        {`${new Date(props.auction.endDate).toLocaleDateString()} ${props.auction.endHour}`}

                                    </p>

                                </label>
                            </div>

                        </div>
                    </div>
                </div>

                {showManual && <BidModal onClose={() => setShowManual(false)} context={"Manual"} auctionId={props.id} increment={props.auction?.minIncrement} startingValue={currentValue + props.auction?.minIncrement} />}
                {showAuto && <BidModal onClose={() => setShowAuto(false)} context={"Automática"} auctionId={props.id} increment={props.auction?.minIncrement} startingValue={currentValue + props.auction?.minIncrement} />}
            </section >
        </div>


    );
}