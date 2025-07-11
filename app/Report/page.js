"use client";
import React, { useState, useEffect } from "react";

export default function BidReport() {
    const [currentPage, setCurrentPage] = useState(1);
    const elementsPerPage = 8;
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;


    const elementList = [
        {
            "userEmail": "yenireedefreitas@gmail.com",
            "auctionName": "La prueba",
            "paymentAmount": 100,
            "dateTime": "2025-07-11T03:30:00Z",
            "paymentName": "Tarjeta de Credito",
            "paymentStatus": "Procesado"
        }
    ];

    const totalPages = Math.ceil(elementList.length / elementsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="bg-gray-50p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">


                <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden mt-4">

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Correo</th>
                                    <th scope="col" className="px-4 py-3">Fecha</th>
                                    <th scope="col" className="px-4 py-3">Subasta</th>
                                    <th scope="col" className="px-4 py-3">Monto</th>
                                    <th scope="col" className="px-4 py-3">Tipo de Pago</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elementList.map((el) => (
                                    <tr className="border-b">
                                        <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{el.userEmail}</th>
                                        <td className="px-4 py-3 text-center">
                                            {new Date(el.dateTime).toLocaleString('es-VE', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                            })}
                                        </td>

                                        <td className="px-4 py-3">{el.auctionName}</td>
                                        <td className="px-4 py-3">{el.paymentAmount}</td>
                                        <td className="px-4 py-3">{el.paymentName}</td>
                                        <td className="px-4 py-3">{el.paymentStatus}</td>

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
