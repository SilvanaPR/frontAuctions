"use client";
import React from "react";
import ProductView from "../../components/ProductView";

export default function CreateProduct() {
    return (
        <div>

            <div id="timepicker-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-[23rem] max-h-full">

                    <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-800">
                        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-700 border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Schedule an appointment
                            </h3>
                        </div>
                        <div class="p-4 pt-0">
                            <div inline-datepicker datepicker-autoselect-today class="mx-auto sm:mx-0 flex justify-center my-5 [&>div>div]:shadow-none [&>div>div]:bg-gray-50 [&_div>button]:bg-gray-50"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
