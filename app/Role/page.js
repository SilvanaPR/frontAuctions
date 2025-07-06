"use client";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ListModal from "../components/ListModal";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Roles() {
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPerPage = 8;
    const [showList, setShowList] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [pendingSubmitData, setPendingSubmitData] = useState(null);

    const rolesList = [
        {
            id: 1,
            rol: "Rol 1",
            permissions: [
                { id: 1, name: "Permiso 1" },
                { id: 3, name: "Permiso 3" }
            ]
        },
        {
            id: 2,
            rol: "Rol 2",
            permissions: [
                { id: 1, name: "Permiso 1" },
                { id: 2, name: "Permiso 2" },
                { id: 3, name: "Permiso 3" }
            ]
        },
        {
            id: 3,
            rol: "Rol 3",
            permissions: [
                { id: 1, name: "Permiso 1" },
                { id: 2, name: "Permiso 2" },
                { id: 3, name: "Permiso 3" }
            ]
        }
    ];

    const allPermissions = [
        { id: 1, name: "Permiso 1" },
        { id: 2, name: "Permiso 2" },
        { id: 3, name: "Permiso 3" },
        { id: 4, name: "Permiso 4" },
    ];

    const totalPages = Math.ceil(rolesList.length / rolesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const openListModal = (permissions) => {
        setSelectedPermissions(permissions);
        setShowList(true);
    };


    const handleConfirmSubmit = () => {
        if (pendingSubmitData) {
            console.log("Datos confirmados para enviar:", pendingSubmitData);

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
                <SearchBar categories={["Todos", "Fecha", "Inicio de Sesion", "Cambio de Contraseña", "Actualización de Perfil"]} />

                <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden mt-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-center">Rol</th>
                                    <th scope="col" className="px-4 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rolesList.map((r) => (
                                    <tr key={r.id} className="border-b">
                                        <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-center">{r.rol}</th>
                                        <td className="px-6 py-4 flex justify-center items-center space-x-4">
                                            <button
                                                onClick={() => openListModal(r.permissions)}
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
                        list={allPermissions}
                        selectedList={selectedPermissions}
                        screen={'role'}
                        onSubmit={handleFormSubmit}
                    />
                )}

                {showConfirm && (
                    <ConfirmationModal
                        message="¿Confirmas los cambios en los permisos?"
                        onCancel={handleCancelSubmit}
                        onConfirm={handleConfirmSubmit}
                        loading={false}
                    />
                )}
            </div>
        </section>
    );
}
