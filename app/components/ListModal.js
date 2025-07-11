'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function ListModal({ onClose, list, selectedList, screen, onSubmit }) {
    const [formData, setFormData] = useState({
        lists: []
    });

    useEffect(() => {
        if (list && Array.isArray(list)) {
            setFormData((prev) => ({
                ...prev,
                lists: list.map(p => p.id)
            }));
        }
    }, [list]);

    useEffect(() => {
        if (selectedList && Array.isArray(selectedList)) {
            setFormData((prev) => ({
                ...prev,
                lists: selectedList.map(p => p.id)
            }));
        }
    }, [selectedList]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const id = parseInt(value);

        setFormData((prev) => {
            const updated = checked
                ? [...prev.lists, id]
                : prev.lists.filter((itemId) => itemId !== id);
            return {
                ...prev,
                lists: updated,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData.lists);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
                <div className="overflow-y-auto px-6 pt-6 pb-4">
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">&times;</button>

                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-8">
                        {screen ? `Modificar ${screen === 'user' ? 'Usuario' : 'Rol'}` : ''}
                    </h1>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative z-0 w-full my-12 group ">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <tbody>
                                    {list.map((li) => (
                                        <tr key={li.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="w-4 p-4">
                                                <input
                                                    id={`checkbox-${li.id}`}
                                                    type="checkbox"
                                                    value={li.id}
                                                    onChange={handleCheckboxChange}
                                                    checked={formData.lists.includes(li.id)}
                                                    className="w-4 h-4 text-brand bg-gray-100 border-gray-300 rounded-sm focus:ring-brand focus:ring-2"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {li.permissionName}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button type="submit" className="w-full text-white bg-brand hover:bg-brandLight font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
