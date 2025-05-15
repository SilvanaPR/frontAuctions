"use client";
import React from "react";

export default function NotificationCard({ title, text, type }) {
    let bgColorClass = 'bg-blue-50';
    let textColorClass = 'text-blue-800';
    let borderColorClass = 'border-blue-300';
    let buttonBgHoverClass = 'hover:bg-blue-900';
    let buttonTextHoverClass = 'hover:text-white';
    let buttonFocusRingClass = 'focus:ring-blue-200';
    let buttonBorderClass = 'border-blue-800';
    let buttonTextColorClass = 'text-blue-800';

    if (type === 'danger') {
        bgColorClass = 'bg-red-50';
        textColorClass = 'text-red-800';
        borderColorClass = 'border-red-300';
        buttonBgHoverClass = 'hover:bg-red-900';
        buttonTextHoverClass = 'hover:text-white';
        buttonFocusRingClass = 'focus:ring-red-300';
        buttonBorderClass = 'border-red-800';
        buttonTextColorClass = 'text-red-800';
    } else if (type === 'success') {
        bgColorClass = 'bg-green-50';
        textColorClass = 'text-green-800';
        borderColorClass = 'border-green-300';
        buttonBgHoverClass = 'hover:bg-green-900';
        buttonTextHoverClass = 'hover:text-white';
        buttonFocusRingClass = 'focus:ring-green-300';
        buttonBorderClass = 'border-green-800';
        buttonTextColorClass = 'text-green-800';
    }

    return (
        <div id={`alert-additional-content-${type}`} className={`p-4 mb-4 ${textColorClass} border ${borderColorClass} rounded-lg ${bgColorClass}`} role="alert">
            <div className="flex items-center">
                <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">{type === 'danger' ? 'Error' : type === 'success' ? 'Éxito' : 'Info'}</span>
                <h3 className="text-lg font-medium">{title}</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
                {text}
            </div>
            <div className="flex">
                <button
                    type="button"
                    className={`text-${textColorClass.split('-')[1]} bg-transparent border ${buttonBorderClass} ${buttonBgHoverClass} ${buttonTextHoverClass} focus:ring-4 focus:outline-none ${buttonFocusRingClass} font-medium rounded-lg text-xs px-3 py-1.5 text-center`}
                    data-dismiss-target={`#alert-additional-content-${type}`}
                    aria-label="Close"
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
}