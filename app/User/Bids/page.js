"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { useSelector, useDispatch } from 'react-redux';


export default function Bids() {
    const [currentPage, setCurrentPage] = useState(1);
    const bidsPerPage = 8;
    const indexOfLastBid = currentPage * bidsPerPage;
    const indexOfFirstBid = indexOfLastBid - bidsPerPage;
    const dispatch = useDispatch();
    const currentAuction = useSelector((state) => state.auction.currentAuction)


    const bidsList = [
        {
            bidId: "2ca53c7d-a134-44f0-8964-4bb6fde15c8d",
            bidAuctionId: "35cfb3f4-9b17-4dce-afcc-e3c8667e229c",
            amount: 23,
            status: "Perdida",
            type: "Manual",
            bidTime: "2025-06-16T18:21:01.221Z"
        }
    ];


    const totalPages = Math.ceil(bidsList.length / bidsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="bg-gray-50p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">

                <SearchBar categories={["Todos", "Fecha", "Inicio de Sesion", "Cambio de Contraseña", "Actualización de Perfil"]} />
                <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden mt-4">

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-4 py-3 ">Subasta</th>
                                    <th scope="col" className="px-4 py-3">Monto</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                    <th scope="col" className="px-4 py-3">Tipo</th>
                                    <th scope="col" className="px-4 py-3">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bidsList.map((b) => (
                                    <tr key={b.bidId} className="border-b">
                                        <td className="px-4 py-3 text-center text-gray-900 whitespace-nowrap">{b.bidId}</td>
                                        <td className="px-4 py-3 text-center">{b.amount}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="me-2 rounded bg-brand bg-opacity-20 px-4 py-1 text-base font-semibold text-brand">
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">{b.type}</td>
                                        <td className="px-4 py-3 text-center">
                                            {new Date(b.bidTime).toLocaleString('es-VE', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                            })}
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
            </div>
        </section>
    );
}
