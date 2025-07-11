"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ListModal from "../components/ListModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, fetchPermissions, fetchRolePermissions, assignPermissionToRole, unassignPermissionFromRole } from "../../lib/features/user/userSlice";

export default function Roles() {
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPerPage = 8;
    const [showList, setShowList] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [pendingSubmitData, setPendingSubmitData] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const dispatch = useDispatch();

    const rolesList = useSelector((state) => state.user.roles);
    const allPermissions = useSelector((state) => state.user.permissions);
    const rolePermissions = useSelector((state) => state.user.rolePermissions);
    const loadingRolePermissions = useSelector((state) => state.user.loadingRolePermissions);

    useEffect(() => {
        dispatch(fetchRoles());
        dispatch(fetchPermissions());
        dispatch(fetchRolePermissions());
    }, [dispatch]);

    // Returns permission objects assigned to the role by matching roleName and permissionName
    const getRoleAssignedPermissions = (roleName) => {
        return rolePermissions
            .filter((rp) => rp.roleName === roleName)
            .map((rp) => {
                // Find the permission object by name
                const perm = allPermissions.find(p => p.permissionName === rp.permissionName);
                return perm ? { ...perm, rolePermissionId: rp.id } : { permissionName: rp.permissionName };
            });
    };

    const totalPages = Math.ceil(rolesList.length / rolesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openListModal = (role) => {
        setSelectedRole(role);
        setShowList(true);
    };

    const handleConfirmSubmit = async () => {
        if (pendingSubmitData && selectedRole) {
            const roleName = selectedRole.roleName;
            const prevAssigned = getRoleAssignedPermissions(roleName).map((p) => p.id);
            const newAssigned = pendingSubmitData;

            // Find permissions to add and remove
            const toAdd = newAssigned.filter((id) => !prevAssigned.includes(id));
            const toRemove = prevAssigned.filter((id) => !newAssigned.includes(id));

            // Assign new permissions
            for (const permissionId of toAdd) {
                await dispatch(assignPermissionToRole({ roleId: roleName, permissionId }));
            }
            // Unassign removed permissions
            for (const permissionId of toRemove) {
                // Find the rolePermissionId for this role/permission
                const rp = rolePermissions.find((rp) => rp.roleName === roleName && rp.permissionId === permissionId);
                if (rp) {
                    await dispatch(unassignPermissionFromRole(rp.id));
                }
            }
            // Refresh assignments
            dispatch(fetchRolePermissions());
            setShowConfirm(false);
            setShowList(false);
            setPendingSubmitData(null);
            setSelectedRole(null);
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

    // Programmatic assign/remove function
    const assignOrRemovePermission = async ({ roleName, permissionName, action }) => {
        // Find the role and permission objects
        const role = rolesList.find(r => r.roleName === roleName);
        const permission = allPermissions.find(p => (p.permissionName === permissionName || p.name === permissionName));
        if (!role || !permission) {
            alert('Role or permission not found');
            return;
        }
        if (action === 'assign') {
            // Check if already assigned by name
            const alreadyAssigned = rolePermissions.some(rp => rp.roleName === role.roleName && rp.permissionName === permission.permissionName);
            if (!alreadyAssigned) {
                await dispatch(assignPermissionToRole({ roleId: role.roleName, permissionId: permission.permissionName }));
                dispatch(fetchRolePermissions());
            }
        } else if (action === 'remove') {
            // Find the assignment by name
            const rp = rolePermissions.find(rp => rp.roleName === role.roleName && rp.permissionName === permission.permissionName);
            if (rp) {
                await dispatch(unassignPermissionFromRole(rp.id));
                dispatch(fetchRolePermissions());
            }
        }
    };


    // Handlers for modal checkbox assign/unassign
    const handleAssignPermission = async (permissionId) => {
        if (selectedRole) {
            // Find permission by id
            const permission = allPermissions.find(p => p.id === permissionId);
            if (!permission) return;
            // Only assign if not already assigned by name
            const alreadyAssigned = rolePermissions.some(rp => rp.roleName === selectedRole.roleName && rp.permissionName === permission.permissionName);
            if (!alreadyAssigned) {
                await dispatch(assignPermissionToRole({ roleId: selectedRole.roleName, permissionId: permission.permissionName }));
                dispatch(fetchRolePermissions());
            }
        }
    };
    const handleUnassignPermission = async (permissionId) => {
        debugger;
        if (selectedRole) {
            // Find permission by id
            const permission = allPermissions.find(p => p.permissionId === permissionId);
            if (!permission) return;
            // Find the assignment by roleName and permissionName
            const rp = rolePermissions.find(rp => rp.roleName === selectedRole.roleName && rp.permissionName === permission.permissionName);
            if (rp) {
                await dispatch(unassignPermissionFromRole(rp.id));
                dispatch(fetchRolePermissions());
            }
        }
    };

    return (
        <section className="bg-gray-50 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <SearchBar categories={["Todos", "Fecha", "Inicio de Sesion", "Cambio de Contraseña", "Actualización de Perfil"]} />
                {/* Test buttons for programmatic assign/remove */}
                <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden mt-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-center">Rol</th>
                                    <th scope="col" className="px-4 py-3 text-center">Permisos Asignados</th>
                                    <th scope="col" className="px-4 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rolesList.map((r) => (
                                    <tr key={r.roleName} className="border-b">
                                        <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-center">{r.roleName}</th>
                                        <td className="px-4 py-3 text-center">
                                            {getRoleAssignedPermissions(r.roleName).map((p) => (
                                                <span key={p.permissionName} className="inline-block bg-gray-200 rounded px-2 py-1 text-xs text-gray-700 mr-1 mb-1">
                                                    {p.permissionName}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center items-center space-x-4">
                                            <button
                                                onClick={() => openListModal(r)}
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
                {showList && selectedRole && (
                    <ListModal
                        onClose={() => { setShowList(false); setSelectedRole(null); }}
                        list={allPermissions}
                        selectedList={getRoleAssignedPermissions(selectedRole.roleName)}
                        screen={'role'}
                        selectedRole={selectedRole}
                        onAssign={handleAssignPermission}
                        onUnassign={handleUnassignPermission}
                    />
                )}
                {showConfirm && (
                    <ConfirmationModal
                        message="¿Confirmas los cambios en los permisos?"
                        onCancel={handleCancelSubmit}
                        onConfirm={handleConfirmSubmit}
                        loading={loadingRolePermissions}
                    />
                )}
            </div>
        </section>
    );
}
