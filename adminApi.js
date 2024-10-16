import { toast } from "react-toastify";

export const BASE_URL = "https://api.carsalesboost.com/api";
// export const BASE_URL = "http://localhost:7000/api";

const cache = {
  users: null,
  usersCount: null,
  invoices: null,
  userDetails: {},
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }
  return data;
};

// Fetch all users with caching
export const getAllUsers = async (setUsers) => {
  if (cache.users) {
    console.log("Using cached users data");
    setUsers(cache.users);
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    const data = await handleResponse(res);
    cache.users = data.users; // Cache the users data
    setUsers(data.users);
  } catch (error) {
    setUsers([]);
    toast.error(error.message);
  }
};

export const getUsersCount = async () => {
  if (cache.usersCount !== null) {
    console.log("Using cached users count");
    return cache.usersCount;
  }

  try {
    const res = await fetch(`${BASE_URL}/admin/user/count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    const data = await handleResponse(res);
    cache.usersCount = data.usersCount; // Cache the users count
    return data.usersCount;
  } catch (error) {
    console.error(error);
    return 0; // Return a default value in case of an error
  }
};

// Fetch all invoices with caching
export const getAllInvoices = async () => {
  if (cache.invoices) {
    console.log("Using cached invoices data");
    return cache.invoices;
  }

  try {
    const res = await fetch(`${BASE_URL}/subscription/invoices/all`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await handleResponse(res);
    cache.invoices = data.invoices || []; // Cache the invoices data
    return cache.invoices;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch details of a single user with caching
export const getSingleUserDetails = async (id) => {
  if (cache.userDetails[id]) {
    console.log("Using cached user details");
    return cache.userDetails[id];
  }

  try {
    const response = await fetch(`${BASE_URL}/admin/user-details/${id}`, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await handleResponse(response);
    cache.userDetails[id] = data.user; // Cache the user details
    return data.user;
  } catch (error) {
    console.error(error);
    return null; // Return null in case of an error
  }
};

// Delete a user account
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

    const data = await handleResponse(response);
    toast.success(data.message);
    delete cache.userDetails[id];
    cache.users = null;
    router.push("/admin/users");
  } catch (error) {
    console.error(error);
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

    const data = await handleResponse(res);
    toast.success(data.message);
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};
