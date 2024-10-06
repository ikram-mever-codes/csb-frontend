import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = "https://api.carsalesboost.com/api";
// export const BASE_URL = "http://localhost:7000/api";

const HEADERS = {
  "Content-Type": "application/json",
};

const handleResponse = (response, successCallback) => {
  if (response.status >= 200 && response.status < 300) {
    successCallback(response.data);
  } else {
    toast.error(response.data.message || "An error occurred");
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

export const getAllTokens = async (setTokens) => {
  try {
    let res = await fetch(`${BASE_URL}/token/all`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",

      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    if (!res.ok) {
      return setTokens([]);
    }
    setTokens(data.tokens || []);
  } catch (error) {
    return toast.error(error.message);
  }
};

export const createToken = async (type, wordpressUrl, setTokens) => {
  let toastId;
  try {
    toastId = toast.loading("Creating Token...");
    const response = await fetch(`${BASE_URL}/token/create`, {
      method: "POST",
      body: JSON.stringify({ type, wordpressUrl }),
      credentials: "include",
      headers: HEADERS,
    });
    handleResponse(response, (data) => {
      setTokens((prev) => [...prev, data.token]);
      toast.update(toastId, {
        render: data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    });
  } catch (error) {
    toast.update(toastId, {
      render: error.message || "An Error Occurred",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  }
};

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
      toast.success(data.message);
    });
  } catch (error) {
    toast.error(error.message);
  }
};

export const getAllListings = async (setListings) => {
  try {
    const response = await fetch(`${BASE_URL}/listing/all`, {
      method: "GET",
      credentials: "include",
      headers: HEADERS,
    });
    handleResponse(response, (data) => setListings(data.listings));
  } catch (error) {
    console.error(error.message);
    setListings([]); // Default to empty if there's an error
  }
};
