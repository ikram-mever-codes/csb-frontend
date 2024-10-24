import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = "https://api.carsalesboost.com/api";
// export const BASE_URL = "http://localhost:7000/api";

const HEADERS = {
  "Content-Type": "application/json",
};

// Simple in-memory cache
const cache = {
  tokens: null,
  listings: null,
};

const handleResponse = async (response, successCallback) => {
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) {
    successCallback(data);
  } else {
    console.error(data.message || "An error occurred");
    toast.error(data.message || "An error occurred");
  }
};

const clearCookies = () => {
  const cookiesToClear = [
    "__session",
    "__clerk_db_jwt",
    "__clerk_db_jwt_rqbcYcZs",
    "__client_uat",
    "__client_uat_rqbcYcZs",
    "__session_rqbcYcZs",
    "_cfuvid",
    "__cf_bm",
    "__token",
  ];

  cookiesToClear.forEach((cookie) => {
    document.cookie = `${cookie}=; expires=${new Date(
      0
    ).toUTCString()}; path=/;`;
  });
};

export const signUp = async (firstName, lastName, email, password, router) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/user/sign-up`,
      { firstName, lastName, email, password },
      { headers: HEADERS, withCredentials: true }
    );
    localStorage.setItem(
      "signUpData",
      JSON.stringify({
        email,
        firstName,
        lastName,
        expiry: data.codeExpirey || Date.now() + 30 * 60 * 1000,
      })
    );
    router.push("/verify");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
  }
};

export const resendCode = async (email) => {
  if (!email) {
    return toast.error("Email is Required");
  }
  try {
    const response = await fetch(`${BASE_URL}/user/resend-code`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({ email }),
    });
    handleResponse(response, (data) => toast.success(data.message));
  } catch (error) {
    toast.error(error.message);
  }
};

export const verifyAccount = async (email, code, router) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/user/verify`,
      { email, verificationCode: code },
      { headers: HEADERS, withCredentials: true }
    );

    localStorage.removeItem("signUpData");
    toast.success(data.message);
    router.push("/dashboard");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
  }
};

export const login = async (email, password, router, setUser) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/user/login`,
      { email, password },
      { headers: HEADERS, withCredentials: true }
    );

    toast.success(data.message);
    setUser(data.user);
    router.push("/dashboard");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
  }
};

export const refresh = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user/refresh`, {
      headers: HEADERS,
      withCredentials: true,
    });
    return data.user;
  } catch {
    return null;
  }
};

export const logout = async (router, setUser) => {
  try {
    await axios.get(`${BASE_URL}/user/logout`, {
      headers: HEADERS,
      withCredentials: true,
    });

    setUser(null);
    clearCookies();
    router.push("/login");
  } catch (error) {
    toast.error(error.message);
  }
};

// Fetch all tokens with caching
export const getAllTokens = async (setTokens) => {
  if (cache.tokens) {
    console.log("Using cached tokens data");
    setTokens(cache.tokens);
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/token/all`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      headers: HEADERS,
    });
    const data = await response.json();
    if (!response.ok) {
      setTokens([]);
      return;
    }
    cache.tokens = data.tokens || []; // Cache the tokens data
    setTokens(cache.tokens);
  } catch (error) {
    setTokens([]); // Reset tokens in case of an error
    toast.error(error.message);
  }
};

// Create a token
export const createToken = async (type, wordpressUrl, setTokens) => {
  try {
    toast.loading("Creating Token...");
    const response = await fetch(`${BASE_URL}/token/create`, {
      method: "POST",
      body: JSON.stringify({ type, wordpressUrl }),
      credentials: "include",
      headers: HEADERS,
    });
    const data = await response.json();
    if (!response.ok) {
      toast.dismiss();
      toast.error(data.message);
      return;
    }
    cache.tokens = [...(cache.tokens || []), data.token]; // Update cached tokens
    setTokens((prev) => [...prev, data.token]);
    toast.success(data.message);
  } catch (error) {
    toast.dismiss();
    toast.error(error.message);
  }
};

// Delete a token
export const deleteToken = async (tokenId, setTokens) => {
  try {
    const response = await fetch(`${BASE_URL}/token/${tokenId}`, {
      method: "DELETE",
      credentials: "include",
      headers: HEADERS,
    });
    handleResponse(response, (data) => {
      setTokens((prevTokens) =>
        prevTokens.filter((token) => token._id !== tokenId)
      );
      cache.tokens = cache.tokens.filter((token) => token._id !== tokenId); // Update cache
      toast.success(data.message);
    });
  } catch (error) {
    toast.error(error.message);
  }
};

// Fetch all listings with caching
export const getAllListings = async (setListings) => {
  if (cache.listings) {
    console.log("Using cached listings data");
    setListings(cache.listings);
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/listing/all`, {
      method: "GET",
      credentials: "include",
      headers: HEADERS,
    });
    let data = response.json();
    setListings(data.listings);
  } catch (error) {
    console.error(error.message);
    setListings([]);
  }
};
