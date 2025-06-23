"use client";
import React, { useState, useEffect } from "react";
import AuctionCard from "../components/Auction/AuctionCard";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuctions, deleteAuction } from "../../lib/features/auction/auctionSlice";
import { ToastContainer, toast } from 'react-toastify';
import ConfirmationModal from '../components/ConfirmationModal';

export default function Auction() {
    const auctions = useSelector((state) => state.auction.auctions);
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const auctionsPerPage = 8
    const indexOfLastAuction = currentPage * auctionsPerPage
    const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage
    const currentAuctions = auctions.slice(indexOfFirstAuction, indexOfLastAuction)
    const totalPages = Math.ceil(auctions.length / auctionsPerPage)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const [showModal, setShowModal] = useState(false);
    const [auctionToDelete, setAuctionToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchAuctions())
        console.log(auctions)
    }, [dispatch])

    const confirmDelete = (auction) => {
        setAuctionToDelete(auction);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (auctionToDelete) {
            dispatch(deleteAuction(auctionToDelete));
            toast.success('Subasta eliminada correctamente', {
                position: "bottom-right",
                className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700',
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
            });
        }
        setShowModal(false);
        setAuctionToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setAuctionToDelete(null);
    };

    return (
        <section className="">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">

                {(currentAuctions ?? []).map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} onDeleteClick={() => confirmDelete(auction)} />
                ))}
                <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`px-4 py-2 rounded-md text-sm font-medium border  ${currentPage === i + 1
                                ? "bg-brand text-white"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-10"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>


            {showModal && (
                <ConfirmationModal
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    message={"¿Estás seguro de eliminar esta subasta?"}
                />
            )}
            <ToastContainer />
        </section>
    );
}
