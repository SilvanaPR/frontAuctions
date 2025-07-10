"use client";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ClaimModal from "../components/Claim/ClaimModal";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Price() {
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPerPage = 8;
    const [showList, setShowList] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showClaim, setShowClaim] = useState(false);
    const [pendingSubmitData, setPendingSubmitData] = useState(null);
    const [selectedCalim, setSelectedClaim] = useState(null);
    const [modalContext, setModalContext] = useState(null);


    const claimList = [
        {
            id: 1,
            reason: "Razon 1",
            description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            evidence: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
            state: "Pendiente"
        },
        {
            id: 2,
            reason: "Razon 2",
            description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            evidence: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
            state: "Pendiente"
        },
        {
            id: 3,
            reason: "Razon 3",
            description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            evidence: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
            state: "Pendiente"
        }
    ];


    const openClaimModal = (claim, context) => {
        setSelectedClaim(claim);
        setShowClaim(true);
        setModalContext(context)
    };



    const totalPages = Math.ceil(claimList.length / rolesPerPage);

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
                                    <th scope="col" className="px-4 py-3 text-center">Evidencia</th>
                                    <th scope="col" className="px-4 py-3 text-center">Subasta</th>
                                    <th scope="col" className="px-4 py-3 text-center">Poducto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {claimList.map((c) => (
                                    <tr key={c.id} className="border-b">
                                        <td className="px-4 py-3 font-small text-gray-900 whitespace-nowrap text-center h-20 w-20">
                                            <div className="flex items-center justify-center h-full w-full">
                                                <img
                                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                                    alt="imac image"
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
                                            {c.reason}
                                        </td>
                                        <td className="px-4 py-3 font-small text-gray-900 whitespace-nowrap text-center">
                                            <span className="me-2 rounded bg-brand bg-opacity-20 px-4 py-1 text-base font-semibold text-brand">
                                                {c.state}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 flex justify-center items-center space-x-4">

                                            <button
                                                onClick={() => openClaimModal(c, "solve")}
                                                className="text-gray-500 hover:text-gray-900"
                                            >
                                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z" />
                                                </svg>

                                            </button>
                                            <button
                                                onClick={() => openClaimModal(c, "solve")}
                                                className="text-gray-500 hover:text-gray-900"
                                            >
                                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                </svg>

                                            </button>
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
