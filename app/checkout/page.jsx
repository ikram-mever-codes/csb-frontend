"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../ContextProvider";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaCreditCard } from "react-icons/fa";

const stripePromise = loadStripe(
  "pk_test_51Pkpf9KUViSr7yF9Fg6xJbYehqqIXhiXiPaeWbiEolnvlTeuAj5lBHxB1CrwHaluQ5oNg8qR4xuvrRXchRimiQhG000M2PoMdw"
);

const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

const CheckoutPage = () => {
  const { user } = useGlobalContext();
  const [isRecurring, setIsRecurring] = useState(false);
  const [duration, setDuration] = useState(monthOptions[0]);
  const [price, setPrice] = useState(39.99);
  const [plan, setPlan] = useState("basic");
  const [name] = useState(`${user.firstName} ${user.lastName}`);
  const [email] = useState(user.email);

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  useEffect(() => {
    const queryPlan = new URLSearchParams(window.location.search).get("plan");
    if (!["basic", "advance"].includes(queryPlan)) {
      router.push("/pricing");
    } else {
      setPlan(queryPlan);
    }
  }, [router]);

  useEffect(() => {
    const basePrice = plan === "basic" ? 39.99 : 99.99;
    setPrice(basePrice * duration);
  }, [duration, plan]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(`Error: ${error.message}`);
      return;
    }

    const data = {
      isRecurring,
      duration: isRecurring ? duration : null,
      name,
      email,
      plan,
      price,
      paymentMethodId: paymentMethod.id,
    };

    try {
      const response = await fetch(
        "http://localhost:7000/api/subscription/buy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Payment successful!");
      } else {
        toast.error(`Payment failed: ${result.message || "Unknown error"}`);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full  bg-white shadow-xl rounded-3xl p-10 mx-10  space-y-8">
        <h1 className="text-4xl font-bold text-center mb-3 text-gray-800">
          Checkout
        </h1>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold flex justify-start items-center flex-col mb-2 capitalize text-gray-700">
            {plan} Plan
          </h2>
          <p className="text-xl font-bold mb-4 text-gray-800">
            {plan === "basic" ? "$39.99" : "$99.99"}
            <span className="text-lg font-normal text-gray-500">/ Monthly</span>
          </p>
          {/* <div className="space-y-2 text-gray-600 flex justify-center items-center">
            {plan === "basic" ? (
              <ul className="w-max justify-center items-start flex-col flex list-disc">
                <li> Facebook Automation</li>
                <li> 2 Api Tokens</li>
                <li> Unlimited Listings</li>
                <li> Analytics & Reports</li>
              </ul>
            ) : (
              <ul className="w-max justify-center items-start flex-col flex list-disc">
                <li> Facebook Automation</li>
                <li> Wordpress Automation</li>
                <li> 3 Api Tokens</li>
                <li> Unlimited Listings</li>
                <li> Analytics & Reports</li>
                <li> 24/7 Customer Support</li>
              </ul>
            )}
          </div> */}
        </div>

        {/* User Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700">
            User Information
          </h2>
          <div className="flex flex-col gap-4 mt-3">
            <input
              type="text"
              readOnly
              value={name}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm"
            />
            <input
              type="email"
              readOnly
              value={email}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm"
            />
          </div>
        </div>

        {/* Payment Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method */}
          <div>
            <label className="font-semibold text-lg text-gray-700">
              Payment Method
            </label>
            <input
              type="text"
              readOnly
              value="Stripe"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm"
            />
          </div>

          {/* Recurring Payments */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="isRecurring"
              className="font-semibold text-lg text-gray-700"
            >
              Recurring Payments
            </label>
            <input
              type="checkbox"
              id="isRecurring"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
              className="h-5 w-5 text-blue-600"
            />
          </div>

          {/* Duration Selector */}
          <div className="flex items-center justify-between">
            <label className="font-semibold text-lg text-gray-700">
              Duration (months)
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setDuration((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="text-xl font-bold text-gray-800">
                {duration}
              </span>
              <button
                type="button"
                className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setDuration((prev) => Math.min(prev + 1, 12))}
              >
                +
              </button>
            </div>
          </div>

          {/* Card Details */}
          <div>
            <label className="font-semibold text-lg text-gray-700">
              Card Details
            </label>
            <CardElement className="p-3 border border-gray-300 rounded-lg shadow-sm" />
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={!stripe}
            className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition-all shadow-lg"
          >
            <FaCreditCard />
            Pay ${price.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
};

const StripeWrapper = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);

export default StripeWrapper;
