"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import ListModal from "../../components/ListModal";

export default function Roles() {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const [showList, setShowList] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);


    const usersList = [
        {
            id: 1,
            user: "User 1",
            roles: [
                { id: 1, name: "Rol 1" },
                { id: 3, name: "Rol 3" }
            ]
        },
        {
            id: 2,
            user: "user 2",
            roles: [
                { id: 1, name: "Rol 1" },

            ]
        },
        {
            id: 3,
            user: "user 3",
            roles: [
                { id: 1, name: "Rol 1" },
                { id: 2, name: "Rol 2" },
                { id: 3, name: "Rol 3" }
            ]
        }
    ];

    const allRoles = [
        { id: 1, name: "Rol 1" },
        { id: 2, name: "Rol 2" },
        { id: 3, name: "Rol 3" },
        { id: 4, name: "Rol 4" },
    ];


    const totalPages = Math.ceil(usersList.length / usersPerPage);

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
                                    <th scope="col" className="px-4 py-3 text-center">Usuario</th>
                                    <th scope="col" className="px-4 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.map((u) => (
                                    <tr key={u.id} className="border-b">
                                        <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-center">{u.user}</th>
                                        <td className="px-6 py-4 flex justify-center items-center space-x-4">
                                            <button
                                                onClick={() => {
                                                    setSelectedRoles(u.roles);
                                                    setShowList(true);
                                                }}
                                                className="text-gray-500 hover:text-gray-900"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
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

                {showList && (
                    <ListModal
                        onClose={() => setShowList(false)}
                        list={allRoles}
                        selectedList={selectedRoles}
                        screen={'user'}
                    />
                )}






            </div>
        </section>
    );
}
