import axios from "axios";
import { StatusCode, ENDPOINT } from "../constants";
import { MemoryClient } from "../utils";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix";
// const baseURLMock = "https://jsonplaceholder.typicode.com/";
const baseURL = `${ENDPOINT}`;
/**
 * @Api Custom class base axios auto inject token header on session storage.
 * @support fetch - post - put - patch - delete.
 * */
export class AxiosInstance {
  _axiosInstance;

  constructor(
    options = {
      setAuthHeader: true,
    }
  ) {
    this._axiosInstance = axios.create({
      // baseURL:
      //   process.env.NODE_ENV === 'production'
      //     ? process.env.REACT_APP_BASE_URL
      //     : baseURL,
      baseURL,
      timeout: 100000,
      headers: {
        ...(options.setAuthHeader && this.getAuthHeader()),
      },
    });

    this._axiosInstance.interceptors.request.use(
      (config) => {
        config.headers = {
          ...this.getHeader(),
          ...config.headers,
        };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this._axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        console.log(err);
        const errCode = err?.response?.status;
        const errMsg = err?.response?.data?.message;
        const originalConfig = err.config;

        if (
          errCode === StatusCode.UnAuthorized &&
          this.getToken() &&
          this.getRefreshToken() &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;
          return await this.handleRefreshToken(originalConfig);
        } else if (errCode === StatusCode.UpgradeRequired) {
          MemoryClient.clearAll();
          Notify.failure("Invalid User, Please login again!", {
            showOnlyTheLastOne: true,
          });
          Loading.pulse("Logging out...", {
            backgroundColor: "#f9f9f9",
            svgColor: "#0043ce",
            messageColor: "#0043ce",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 4000);
        } else if (errCode === StatusCode.ManyRequest) {
          Notify.failure("Many requests, try again after some minutes!", {
            showOnlyTheLastOne: true,
          });
        } else if (errCode === StatusCode.ServerError) {
          Notify.failure(
            errMsg || "Something went wrong, try again after some minutes!",
            {
              showOnlyTheLastOne: true,
            }
          );
        } else if (errCode === StatusCode.NetworkError) {
          Notify.failure("Connection network error, Please check network!", {
            showOnlyTheLastOne: true,
          });
        } else if (errCode === StatusCode.NotFound) {
          Notify.failure("Request url not found, try again later!", {
            showOnlyTheLastOne: true,
          });
        }
        return Promise.reject(err);
      }
    );
  }

  /**
   * @fetch method auto inject header token.
   * @param url - { String }.
   * @response Promise axios get method.
   * */
  fetch(url) {
    return this._axiosInstance.get(`${url}`);
  }

  /**
   * @post method auto inject header token.
   * @param url - { String }, payload - { String }.
   * @response Promise axios post method.
   * */
  post(url, payload, headers = {}) {
    return this._axiosInstance.post(`${url}`, payload, { headers });
  }

  /**
   * @put method auto inject header token.
   * @param url - { String }, payload - { String }.
   * @response Promise axios put method.
   * */
  put(url, payload, headers = {}) {
    return this._axiosInstance.put(`${url}`, payload, {
      headers,
    });
  }

  /**
   * @patch method auto inject header token.
   * @param url - { String }, payload - { String }.
   * @response Promise axios patch method.
   * */
  patch(url, payload) {
    return this._axiosInstance.patch(`${url}`, payload);
  }

  /**
   * @delete method auto inject header token.
   * @param url - { String }, payload - { String }.
   * @response Promise axios delete method.
   * */
  delete(url, payload) {
    return this._axiosInstance.delete(`${url}`, payload);
  }

  /**
   * @return Header axios object.
   * */
  getHeader() {
    return {
      "Content-Type": "application/json",
      // "auth-token": this.getToken(),
    };
  }
  /**
   * @get token header from session storage.
   * @return Header axios object.
   * */
  getAuthHeader() {
    return {
      "auth-token": this.getToken(),
    };
  }

  getToken() {
    return MemoryClient.get("lp") || "";
  }

  getRefreshToken() {
    return MemoryClient.get("rlp") || "";
  }

  async handleRefreshToken(originalConfig) {
    try {
      const rs = await this._axiosInstance.post("common/auth/refresh-token", {
        oldToken: this.getRefreshToken(),
      });

      const { access_token, refresh_token } = rs.data.data;
      MemoryClient.set("lp", access_token);
      MemoryClient.set("rlp", refresh_token);

      return this._axiosInstance(originalConfig);
    } catch (_error) {
      return Promise.reject(_error);
    }
  }
}

export const Axios = new AxiosInstance();
