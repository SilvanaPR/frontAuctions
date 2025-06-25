"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";

export default function Activity() {
    const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 8;
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  

  const activitiesList = [
    {
        id: 1,
        activity: "Actividad 1",
        date: "2021-01-01",
        type: "Tipo 1",}
  ];

  const totalPages = Math.ceil(activitiesList.length / activitiesPerPage);

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
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-4 py-3">Actividad</th>
                            <th scope="col" className="px-4 py-3">Fecha</th>
                            <th scope="col" className="px-4 py-3">Tipo</th>
                            <th scope="col" className="px-4 py-3">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activitiesList.map((act) => (
                            <tr key={act.id} className="border-b">
                                <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{act.activity}</th>
                                <td className="px-4 py-3">{act.date}</td>
                                <td className="px-4 py-3">{act.type}</td>
                                <td className="px-4 py-3">{act.activity}</td>
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
