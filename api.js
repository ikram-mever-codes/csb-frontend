import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:7000/api";

export const signUp = async (firstName, lastName, email, password, router) => {
  try {
    let res = await axios.post(
      `${BASE_URL}/user/sign-up`,
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    localStorage.setItem(
      "signUpData",
      JSON.stringify({
        email,
        firstName,
        lastName,
        expiry: res.data.codeExpirey || Date.now() + 30 * 60 * 1000,
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
    let res = await fetch(`${BASE_URL}/user/resend-code`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    let data = await res.json();

    if (!res.ok) {
      return toast.error(data.message);
    }
    toast.success(data.message);
  } catch (error) {
    return toast.error(error.message);
  }
};
export const verifyAccount = async (email, code, router) => {
  try {
    let res = await axios.post(
      `${BASE_URL}/user/verify`,
      {
        email,
        verificationCode: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    localStorage.removeItem("signUpData");
    toast.success(res.data.message);
    router.push("/dashboard");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
  }
};

export const login = async (email, password, router, setUser) => {
  try {
    let res = await axios.post(
      `${BASE_URL}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    toast.success(res.data.message);

    setUser(res.data.user);
    router.push("/dashboard");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
  }
};

export const refresh = async () => {
  try {
    let res = await axios.get(`${BASE_URL}/user/refresh`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data.user;
  } catch (error) {
    return;
  }
};

export const logout = async (router, setUser) => {
  try {
    let res = await axios.get(`${BASE_URL}/user/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setUser(null);
    return router.push("/login");
  } catch (error) {
    return toast.error(error.data.message || error.message);
  }
};

export const changePassword = async (
  currentPassword,
  newPassword,
  confirmNewPassword
) => {
  try {
    let res = await fetch(`${BASE_URL}/user/change-password`, {
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });
    let data = await res.json();
    if (!res.ok) {
      return toast.error(data.message);
    }
    toast.success(data.message);
  } catch (error) {
    return toast.error(error.message);
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
    let res = await fetch(`${BASE_URL}/token/create`, {
      method: "POST",
      body: JSON.stringify({ type, wordpressUrl }),
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    let data = await res.json();
    if (!res.ok) {
      return toast.update(toastId, {
        render: data.message || "An Error Occured",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
    setTokens((prev) => [...prev, data.token]);
    return toast.update(toastId, {
      render: data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  } catch (error) {
    return toast.update(toastId, {
      render: error.message || "An Error Occured",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  }
};

export const deleteToken = async (tokenId, setTokens) => {
  try {
    let res = await fetch(`${BASE_URL}/token/${tokenId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    let data = await res.json();

    if (!res.ok) {
      return toast.error(data.message || "An error occurred");
    }

    setTokens((prevTokens) =>
      prevTokens.filter((token) => token._id !== tokenId)
    );

    toast.success(data.message);
  } catch (error) {
    toast.error(error.message);
  }
};

export const getAllListings = async (setListings) => {
  try {
    let response = await fetch(`${BASE_URL}/listing/all`, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    if (!response.ok) {
      setListings([]);
      return;
    }
    setListings(data.listings);
  } catch (error) {
    console.log(error.message);
    return;
  }
};
