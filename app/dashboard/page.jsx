"use client";
import React, { useEffect, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { useGlobalContext } from "../ContextProvider";
import Link from "next/link";
import SalesChart from "@/Components/SalesChart";
import { getAllListings } from "@/api";
import Loading from "../loading";
import { getAllInvoices } from "@/adminApi";

const Page = () => {
  const { user } = useGlobalContext();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [invoices, setInvoices] = useState([]);

  function formatDate(dat) {
    let date = new Date(dat);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}` !== "NaN-NaN-NaN"
      ? `${day}-${month}-${year}`
      : "N/A";
  }

  const filterListingsByMonth = (listings) => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    return listings.filter((listing) => {
      const listingDate = new Date(listing.createdAt);
      return (
        listingDate.getMonth() + 1 === currentMonth &&
        listingDate.getFullYear() === currentYear
      );
    });
  };

  const fetchInvoices = async () => {
    if (user.role !== "admin") {
      return;
    }
    try {
      let invoices = await getAllInvoices();

      const totalSales = invoices.reduce((sum, invoice) => {
        return sum + invoice.total_amount;
      }, 0);

      setSales(totalSales);

      setInvoices(invoices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        await getAllListings(setListings);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetchInvoices();
    fetchListings();
    if (listings.length > 0) {
      const filtered = filterListingsByMonth(listings);
      setListings(filtered);
    }
  }, []);

  return (
    <div className="w-full h-max flex justify-start items-center flex-col gap-2 ">
      <div className="w-full h-auto flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="w-full h-[50vh] lg:w-[60%]  flex flex-col justify-between p-6 bg-gradient-to-r from-[#a42bac] via-black to-[#f13026] rounded-lg shadow-2xl">
          <div className="text-[35px] text-white font-bold mb-4">
            Hello {user.firstName} 👋
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4">
            {user.role === "admin" ? (
              <>
                <InfoCard
                  icon="$"
                  label="Total Sales"
                  value={"$" + sales}
                  color="text-white"
                />
                <InfoCard
                  icon={<MdVisibility className="text-[18px]" />}
                  label="Total Visitors"
                  value="5715"
                  color="text-white"
                />
              </>
            ) : (
              <>
                <InfoCard
                  icon="$"
                  label="Membership Due"
                  value={formatDate(user?.subscription.endDate) || "N/A"}
                  color="text-[#E36C40]"
                />
                <InfoCard
                  icon={<MdVisibility className="text-[18px] " />}
                  label="Posts this Month"
                  value={listings.length}
                  color="text-[#E36C40]"
                />
              </>
            )}
          </div>
        </div>

        {user.role === "user" && (
          <div className="w-full lg:w-[40%] h-[50vh] p-6 py-2 shadow-lg rounded-xl bg-white flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Recent Posts</h2>
            {loading ? (
              <div className="h-[30vh] w-full flex justify-center items-center ">
                <Loading size={60} height={"max"} />
              </div>
            ) : listings.length !== 0 ? (
              <div className="flex flex-col gap-2 justify-start">
                {listings.slice(0, 3).map((post, index) => (
                  <RecentPost key={index} post={post} />
                ))}
              </div>
            ) : (
              <div className="">No Listings Found!</div>
            )}
            <Link
              href="/posts"
              className="w-full h-[2.5rem] button-gradient text-white font-bold rounded-lg flex justify-center items-center"
            >
              Read More
            </Link>
          </div>
        )}
        {user.role === "admin" && (
          <div className="w-full lg:w-[40%] h-[50vh] p-6 py-2 shadow-lg rounded-xl bg-white flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Recent Sales</h2>
            {invoices.length !== 0 ? (
              <div className="flex flex-col gap-2 justify-start">
                {invoices.slice(0, 3).map((invoice, index) => (
                  <RecentInvoice key={index} invoice={invoice} />
                ))}
              </div>
            ) : (
              <div>No Invoices Found!</div>
            )}
            <Link
              href="/sales"
              className="w-full h-[2.5rem] button-gradient text-white font-bold rounded-lg flex justify-center items-center"
            >
              View All Invoices
            </Link>
          </div>
        )}
      </div>

      {user.role === "admin" && (
        <div className="w-full h-[60vh] mt-8 bg-white rounded-lg shadow-lg flex justify-center items-center md:p-4">
          <SalesChart invoices={invoices} />
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ icon, label, value, color }) => (
  <div className="w-full md:w-[48%] h-[7rem] bg-[#2C2C2C] rounded-xl p-4 flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <div className="text-white w-[25px] h-[25px] flex justify-center items-center rounded-full border border-gray-600">
        {icon}
      </div>
      <div className="text-center text-[#8194A3] font-bold">{label}</div>
    </div>
    <div className={`text-right text-[30px] font-extrabold ${color}`}>
      {value}
    </div>
  </div>
);

const RecentPost = ({ post }) => (
  <div className="flex justify-start items-center gap-4">
    <img
      src={post.images[0]}
      alt="car image"
      className="w-[80px] w-max-[80px] rounded-md h-[40px] object-cover object-center"
    />

    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-extrabold">{post.title}</h2>
      <h3 className="text-sm text-gray-600">{post.from}</h3>
    </div>
  </div>
);

const RecentInvoice = ({ invoice }) => (
  <div className="flex justify-between items-center gap-4">
    <img
      src={invoice.customer.avatar}
      alt="customer avatar"
      className="w-[60px] rounded-full h-[60px] object-cover object-center"
    />
    <div className="flex flex-col gap-2 w-full  justify-start items-center">
      <h2 className="text-md font-extrabold text-left  w-full">
        {invoice.customer.name}
      </h2>
      <h3 className="text-sm text-gray-600 text-left w-full">
        {invoice.plan || "basic"}
      </h3>
    </div>
    <div className="w-[6rem] h-[2.3rem] px-[10px] flex justify-center items-center bg-green-200 text-green-700 rounded-full font-bold">
      +${invoice.total_amount}
    </div>
  </div>
);

export default Page;
