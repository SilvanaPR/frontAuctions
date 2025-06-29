import React from 'react';
import {PaymentElement} from '@stripe/react-stripe-js';

const SetupForm = () => {
  return (
    <div className="items-center justify-center h-screen w-full">
        <section>
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-white rounded-lg shadow">
                <form>
                <PaymentElement />
                <button className="my-6 w-full text-white bg-brand hover:bg-brandLight font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                </form>
            </div>
        </section>
    </div>
  );
};

export default SetupForm;