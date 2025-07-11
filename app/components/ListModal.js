'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function ListModal({ onClose, list, selectedList, screen, onAssign, onUnassign, selectedRole }) {
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

    // Helper: get array of assigned permission names
    const assignedPermissionNames = Array.isArray(selectedList)
        ? selectedList.map(p => p.permissionName)
        : [];

    const handleCheckboxChange = (e) => {
        const { value , checked } = e.target;
        if (checked) {
            onAssign && onAssign(value);
        } else {
            onUnassign && onUnassign(value);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
                <div className="overflow-y-auto px-6 pt-6 pb-4">
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">&times;</button>

                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-8">
                        {screen ? `Modificar ${screen === 'user' ? 'Usuario' : 'Rol'}` : ''}
                    </h1>

                    <div className="space-y-4">
                        <div className="relative z-0 w-full my-12 group ">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <tbody>
                                    {list.map((li) => (
                                        <tr key={li.permissionName} className="bg-white border-b hover:bg-gray-50">
                                            <td className="w-4 p-4">
                                                <input
                                                    id={`checkbox-${li.id}`}
                                                    type="checkbox"
                                                    value={li.permissionId}
                                                    onChange={handleCheckboxChange}
                                                    checked={assignedPermissionNames.includes(li.permissionName)}
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
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
