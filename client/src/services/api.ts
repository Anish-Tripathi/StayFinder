import axios from 'axios';
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // Remove the default Content-Type header - axios will handle it automatically
  withCredentials: true, // Important for cookies/sessions if using them
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Skip auth header for certain endpoints
    if (config.url?.includes('/auth/login') || config.url?.includes('/auth/refresh')) {
      return config;
    }

    try {
      const { token: storeToken } = useAuthStore.getState();
      let token = storeToken;

      // Fallback to localStorage if store doesn't have token
      if (!token) {
        const authData = localStorage.getItem("stayfinder-auth");
        if (authData) {
          try {
            const parsed = JSON.parse(authData);
            token = parsed?.state?.token;
            
            // If found in localStorage, update store to keep in sync
            if (token && useAuthStore.getState().setToken) {
              useAuthStore.getState().setToken(token);
            }
          } catch (e) {
            console.error("Failed to parse auth data from localStorage", e);
            // Clean up corrupted data
            localStorage.removeItem("stayfinder-auth");
          }
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No authentication token available");
      }

      // Handle Content-Type based on data type
      if (config.data instanceof FormData) {
        // For FormData, don't set Content-Type - let browser handle it
        // This allows the browser to set multipart/form-data with boundary
        delete config.headers['Content-Type'];
      } else if (!config.headers['Content-Type']) {
        // For other requests, default to JSON
        config.headers['Content-Type'] = 'application/json';
      }

      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token if this was not a refresh request
        if (!originalRequest.url.includes('/auth/refresh')) {
          const response = await api.post('/auth/refresh');
          const newToken = response.data.token;
          
          // Update token in store and localStorage
          if (useAuthStore.getState().setToken) {
            useAuthStore.getState().setToken(newToken);
          }
          
          // Update localStorage
          const authData = localStorage.getItem("stayfinder-auth");
          if (authData) {
            try {
              const parsed = JSON.parse(authData);
              localStorage.setItem("stayfinder-auth", JSON.stringify({
                ...parsed,
                state: {
                  ...parsed.state,
                  token: newToken
                }
              }));
            } catch (e) {
              console.error("Failed to update token in localStorage", e);
            }
          }
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear auth data and redirect to login
        localStorage.removeItem('stayfinder-auth');
        if (useAuthStore.getState().logout) {
          useAuthStore.getState().logout();
        }
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url
      });
    } else {
      console.error("API Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;