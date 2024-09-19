import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:7000/api";

export const getAllUsers = async (setUsers) => {
  try {
    let res = await fetch(`${BASE_URL}/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });
    let data = await res.json();
    console.log(data);
    if (!res.ok) {
      setUsers([]);
      return;
    }
    setUsers(data.users);
  } catch (error) {
    return toast.error(error.message);
  }
};

export const getAllInvoices = async () => {
  try {
    let res = await fetch(`${BASE_URL}/subscription/invoices/all`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    if (!res.ok) {
      return [];
    }
    return data.invoices || [];
  } catch (error) {
    console.log(error);
    return;
  }
};
