"use client";
import React, { useState, useEffect } from "react";

export default function Card() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;


  const cardList = [
    {
      "cardId": "180eb7df-cebf-4940-b5b4-09b7eda8bef0",
      "cardLastDigits": "4242",
      "cardExpirationDate": "2025-06-30T00:00:00Z",
      "cardBrand": "Visa",
      "cardUserId": "35cfb3f4-9b17-4dce-afcc-e3c8667e229c",
      "isDefault": true,
      "cardIdstripe": "pm_card_visa"
    }
  ];

  const totalPages = Math.ceil(cardList.length / cardsPerPage);

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
                  <th scope="col" className="px-4 py-3">4 Ultimos Digistos</th>
                  <th scope="col" className="px-4 py-3">Fecha</th>
                  <th scope="col" className="px-4 py-3">Tipo Tarjeta</th>
                  <th scope="col" className="px-4 py-3">Por Default</th>
                  <th scope="col" className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cardList.map((card) => (
                  <tr key={card.id} className="border-b">
                    <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{card.cardLastDigits}</th>
                    <td className="px-4 py-3 text-center">
                      {new Date(card.cardExpirationDate).toLocaleString('es-VE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </td>

                    <td className="px-4 py-3">{card.cardBrand}</td>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={card.isDefault}
                        onChange={(e) => setIsDefault(e.target.checked)}
                      />
                    </td>
                    <td className="px-6 py-4 flex justify-center items-center space-x-4">
                      <button
                        onClick={console.log("delete")}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM3 5h18M19 7l-.866 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7h14Z" />
                        </svg>

                      </button>


                      <button
                        onClick={console.log("predeterminado")}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
      </div>
    </section>
  );
}
