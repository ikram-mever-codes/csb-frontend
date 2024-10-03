import { toast } from "react-toastify";

export const BASE_URL = "https://api.carsalesboost.com/api";
// export const BASE_URL = "http://localhost:7000/api";

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

export const getSingleUserDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/user-details/${id}`, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (!response.ok) {
      return null;
    }
    console.log(data);
    return data.user;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserAccount = async (id, router) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/user/${id}`, {
      method: "DELETE",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (response.ok) {
      toast.success(data.message);
      router.push("/admin/users");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const changeMembershipType = async (userId, plan) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/user/sub-type`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ userId, plan }),
    });
    const data = await res.json();
    if (!res.ok) {
      return toast.error(data.message);
    }
    toast.success(data.message);
  } catch (error) {
    return toast.error(error.message);
  }
};
