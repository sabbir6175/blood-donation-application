

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const GiveFund = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_YOUR_STRIPE_PUBLIC_KEY);

    return (
        <div className="container mx-auto my-32">
          
            <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
               
            <div className="text-center mb-10">
                  <h1 className="font-bold text-2xl md:text-3xl mb-3 ">Funding Card</h1>
                  <span className="text-base font-normal  text-center opacity-70">We need funding for our blood donation project to ensure timely access to blood in emergencies. <br /> Your contribution can play a vital role in saving lives.</span>
               </div>
                <div className="md:w-9/12 lg:8/12 mx-auto mt-6 p-3 md:p-6 bg-base-200">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>

            </div>
        </div>
    );
};

export default GiveFund;