"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ClaimModal from "../components/Claim/ClaimModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { fetchAuctions } from "../../lib/features/auction/auctionSlice";
import { useSelector, useDispatch } from 'react-redux';
import Link from "next/link";


export default function Price() {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPerPage = 8;
    const [showList, setShowList] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showClaim, setShowClaim] = useState(false);
    const [pendingSubmitData, setPendingSubmitData] = useState(null);
    const [selectedCalim, setSelectedClaim] = useState(null);
    const auctions = useSelector((state) => state.auction.auctions);
    const [modalContext, setModalContext] = useState(null);

    useEffect(() => {
        dispatch(fetchAuctions('Active'))

        console.log(auctions)
    }, [dispatch])



    const openClaimModal = (claim, context) => {
        setSelectedClaim(claim);
        setShowClaim(true);
        setModalContext(context)
    };



    const totalPages = Math.ceil(auctions.length / rolesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const handleConfirmSubmit = () => {
        if (pendingSubmitData) {
            console.log("Datos confirmados para enviar:", pendingSubmitData);

            if (context === "create") {
                // CREAR RECLAMO
            } else {
                // RESOLVER RECLAMO
            }

            setShowConfirm(false);
            setShowList(false);
            setPendingSubmitData(null);
        }
    };

    const handleCancelSubmit = () => {
        setShowConfirm(false);
        setPendingSubmitData(null);
    };
    const handleFormSubmit = (formData) => {
        setPendingSubmitData(formData);
        setShowConfirm(true);
    };

    return (
        <section className="bg-gray-50 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="flex gap-4 items-center mb-6">

                    <div className="flex-grow">
                        <SearchBar categories={["Todos", "Fecha", "Inicio de Sesion", "Cambio de Contraseña", "Actualización de Perfil"]} />
                    </div>
                </div>


                <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden mt-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-center">Imagen</th>
                                    <th scope="col" className="px-4 py-3 text-center">Subasta</th>
                                    <th scope="col" className="px-4 py-3 text-center">Monto</th>
                                    <th scope="col" className="px-4 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auctions.map((auction) => (
                                    <tr key={auction.id} className="border-b">
                                        <td className="px-4 py-3 font-small text-gray-900 whitespace-nowrap text-center h-20 w-20">
                                            <div className="flex items-center justify-center h-full w-full">
                                                <img
                                                    src={auction.image}
                                                    alt="imac image"
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
                                            {auction.name}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
                                            {auction.amount}
                                        </td>

                                        <td className="px-6 py-4 flex justify-center items-center space-x-4">

                                            <Link
                                                href={`/Price/${auction.id}?context=report`}
                                                className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                                            >

                                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z" />
                                                </svg>

                                            </Link>

                                            <Link
                                                href={`/Price/${auction.id}?context=claim`}
                                                className="block p-1 text-sm text-gray-700 hover:text-black hover:font-medium"
                                            >

                                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                </svg>

                                            </Link>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center my-8 space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={`px-4 py-2 rounded-md text-sm font-medium border 
                                ${currentPage === number ? 'bg-brand text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>

                {showClaim && <ClaimModal onClose={() => setShowClaim(false)} context={modalContext} claim={selectedCalim} />}

                {showConfirm && (
                    <ConfirmationModal
                        message="¿Confirmas los cambios en los permisos?"
                        onCancel={handleCancelSubmit}
                        onConfirm={handleConfirmSubmit}
                        loading={false}
                    />
                )}
            </div>
        </section >
    );
}
