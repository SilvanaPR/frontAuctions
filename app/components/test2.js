"use client";
import React from "react";
import ProductView from "../../components/ProductView";

export default function CreateProduct() {
    return (
        <div>

            <div id="drawer-timepicker" class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-96 " tabindex="-1" aria-labelledby="drawer-timepicker-label">

                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center min-w-[4rem]">
                            <input checked id="monday" name="days" type="checkbox" value="monday" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                            <label for="monday" class="ms-2 text-sm font-medium text-gray-900 ">Mon</label>
                        </div>
                        <div class="w-full max-w-[7rem]">
                            <label for="start-time-monday" class="sr-only">Start time:</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="time" id="start-time-monday" name="start-time-monday" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min="09:00" max="18:00" value="00:00" required />
                            </div>
                        </div>
                        <div class="w-full max-w-[7rem]">
                            <label for="end-time-monday" class="sr-only">End time:</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="time" id="end-time-monday" name="end-time-monday" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min="09:00" max="18:00" value="00:00" required />
                            </div>
                        </div>
                        <div>
                            <button type="button" class="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 ">
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
