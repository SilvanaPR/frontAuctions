"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { fetchActivityHistory } from "../../../lib/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Activity() {
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 10;
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const activitiesList = useSelector((state) => state.user.activityHistory);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("Todos");

  useEffect(() => {
    dispatch(fetchActivityHistory());
  }, []);

  const totalPages = Math.ceil(activitiesList.length / activitiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update: handleSearch now receives both query and category
  const handleSearch = (query, category = "Todos") => {
    setSearchQuery(query);
    setSearchCategory(category);
    setCurrentPage(1);
  };

  // Map category names to activity fields
  const categoryFieldMap = {
    "Todos": null,
    "Fecha": "timestamp",
    "Inicio de Sesion": "action",
    "Cambio de Contraseña": "action",
    "Actualización de Perfil": "action",
  };

  // Filter logic
  const filteredActivities = activitiesList.filter((act) => {
    const lowerQuery = searchQuery.toLowerCase();
    if (!lowerQuery) return true;
    if (searchCategory === "Todos") {
      return (
        act.id.toLowerCase().includes(lowerQuery) ||
        act.action.toLowerCase().includes(lowerQuery) ||
        new Date(act.timestamp).toLocaleDateString().includes(lowerQuery)
      );
    } else if (searchCategory === "Fecha") {
      return new Date(act.timestamp).toLocaleDateString().includes(lowerQuery);
    } else if (searchCategory === "Inicio de Sesion") {
      return act.action.toLowerCase().includes("inicio de sesion") && act.action.toLowerCase().includes(lowerQuery);
    } else if (searchCategory === "Cambio de Contraseña") {
      return act.action.toLowerCase().includes("cambio de contraseña") && act.action.toLowerCase().includes(lowerQuery);
    } else if (searchCategory === "Actualización de Perfil") {
      return act.action.toLowerCase().includes("actualización de perfil") && act.action.toLowerCase().includes(lowerQuery);
    }
    return false;
  });

  return (
    <section className="bg-gray-50p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <SearchBar
          categories={["Todos", "Fecha", "Inicio de Sesion", "Cambio de Contraseña", "Actualización de Perfil"]}
          onSearch={(query, category) => handleSearch(query, category)}
        />
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-4 py-3">Actividad</th>
                  <th scope="col" className="px-4 py-3">Fecha</th>
                  <th scope="col" className="px-4 py-3">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities
                  .slice(indexOfFirstActivity, indexOfLastActivity)
                  .map((act) => {
                    const date = new Date(act.timestamp);
                    return (
                      <tr key={act.id} className="border-b">
                        <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{act.id}</th>
                        <td className="px-4 py-3">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</td>
                        <td className="px-4 py-3">{act.action}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center my-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-4 py-2 rounded-md text-sm font-medium border 
                  ${currentPage === number ? "bg-brand text-white" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
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
