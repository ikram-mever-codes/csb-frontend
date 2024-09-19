import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const groupInvoicesByMonth = (invoices) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const groupedData = monthNames.map((month) => ({ month, sales: 0 }));

  invoices.forEach((invoice) => {
    const invoiceDate = new Date(invoice.invoice_date);
    const monthIndex = invoiceDate.getMonth();

    groupedData[monthIndex].sales += invoice.total_amount;
  });

  return groupedData;
};

const SalesChart = ({ invoices }) => {
  const chartData = useMemo(() => groupInvoicesByMonth(invoices), [invoices]);

  return (
    <div className="w-full h-full bg-white rounded-md shadow-lg p-4 md:p-6 flex items-center justify-start">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#E36C40"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={{ fill: "#f13026" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
