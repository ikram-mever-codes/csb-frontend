"use client";
import React, { useState, useEffect } from "react";
import { getAllInvoices } from "@/adminApi";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../ContextProvider";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";

const InvoicePage = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const invoices = await getAllInvoices();
      setInvoices(invoices);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/dashboard");
      return;
    }
    fetchInvoices();
  }, [user]);

  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="w-full h-max min-h-[60vh] flex flex-col gap-6 bg-white rounded-lg px-8 py-6 shadow-lg">
      <div className="text-[24px] font-bold text-gray-800">
        Invoices{" "}
        <span className="font-extrabold text-[#E36C40] text-[25px]">
          ({invoices.length})
        </span>
      </div>

      {loading ? (
        <Loading size={70} height="full" />
      ) : invoices.length === 0 ? (
        <div className="text-center text-gray-500">No sales found</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="border-b border-solid border-gray-300">
              <tr>
                <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-center">
                  Customer
                </th>
                <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-center">
                  Email
                </th>
                <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-center">
                  Total Payment
                </th>
                <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-center">
                  Invoice Date
                </th>
                <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-center">
                  Status
                </th>
                <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-3  text-center flex items-center max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
                    <Image
                      src={invoice.customer.avatar || "/default-avatar.png"}
                      alt={invoice.customer.name}
                      className="rounded-full object-cover object-center w-[50px] h-[50px] mr-3"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="py-3 px-1 text-black font-normal text-center max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {invoice.customer.email}
                  </td>
                  <td className="py-3 px-4 text-black  text-center font-bold">
                    ${invoice.total_amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-black font-normal text-center">
                    {formatDate(invoice.created_at)}
                  </td>
                  <td className="py-3 px-4 text-black font-normal text-center">
                    <button
                      className={`w-full h-[2rem] text-[14px] rounded-full ${
                        invoice.payment_status === "completed"
                          ? "bg-green-200 text-green-700"
                          : invoice.status === "pending" ||
                            invoice.status === "failed"
                          ? "bg-red-200 text-red-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {invoice.payment_status}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link
                      href={`http://localhost:7000${invoice.pdf_url}`}
                      className="w-full h-[2rem] text-[14px] bg-black text-white rounded-full flex justify-center items-center"
                    >
                      Invoice
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
