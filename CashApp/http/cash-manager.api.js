import axios from "axios";
import { env } from "../env/index";
import { setCurrentUser } from "../stores/reducers/currentUserReducer";
import { LocalStorage } from "../localstorage/index";
import * as store from "../stores/index";

const httpApi = axios.create({
  baseURL: env.CASHMANAGER_API_ROOT_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

httpApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      const { config } = error;
      const storeCurrentState = store.default.getState();
      if (
        storeCurrentState &&
        storeCurrentState.currentUser &&
        storeCurrentState.currentUser.value &&
        storeCurrentState.currentUser.value.refreshToken
      ) {
        const currentUser = { ...storeCurrentState.currentUser.value };
        refreshToken({
          refreshToken: currentUser.refreshToken,
        })
          .then((data) => {

            console.log(data)
            const { refreshToken, accessToken } = data.session;
            currentUser.refreshToken = refreshToken;
            currentUser.accessToken = accessToken;

            config.headers = {
              ...JSON.parse(JSON.stringify(config.headers || {})),
              Authorization: `Bearer ${accessToken}`,
            };

            console.log(JSON.stringify(config, null, 4));
            setCurrentUser(currentUser);
            return new Promise((resolve) => {
              resolve(axios(config));
            });
          })
          .catch(async (error) => {
            console.error(error);
            // return await LocalStorage.removeData(
            //   env.LOCAL_STORAGE_CURRENT_USER_KEY
            // ).then(() => setCurrentUser(null));
          });
      }
    }
    return Promise.reject(error);
  }
);

const mergeAuthHeaders = (axiosInstance, token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axiosInstance;
};

export const login = async (data = { email: "", password: "" }) => {
  return await httpApi
    .post("/auth/login", data)
    .then((response) => response.data);
};

export const refreshToken = async (data = { refreshToken: "" }) => {
  return await httpApi
    .post("/auth/refreshToken", data)
    .then((response) => response.data);
};

export const registerProductCategory = async (
  data = {
    label: "",
  },
  token = ""
) => {
  return await mergeAuthHeaders(httpApi, token)
    .post("/product-categories", data)
    .then((response) => response.data);
};

export const getProductCategories = async (token = "") => {
  return await mergeAuthHeaders(httpApi, token)
    .get("/product-categories")
    .then((response) => response.data);
};

export const registerProduct = async (
  data = {
    unit: "L",
    label: "",
    category: "",
    ref: "",
    description: "",
  },
  token = ""
) => {
  return await mergeAuthHeaders(httpApi, token)
    .post("/products", data)
    .then((response) => response.data);
};

export const updateProduct = async (
  id = "",
  data = {
    unit: "L",
    label: "",
    category: "",
    ref: "",
    description: "",
  },
  token = ""
) => {
  return await mergeAuthHeaders(httpApi, token)
    .patch(`/products/${id}`, data)
    .then((response) => response.data);
};

export const getProducts = async (token = "") => {
  return await mergeAuthHeaders(httpApi, token)
    .get("/products?deleted=0")
    .then((response) => response.data);
};

export const getTickets = async (token = "") => {
  const periodicity = {
    start: Date.now() - 24 * 7 * 60 * 60 * 1000,
    end: Date.now() + 24 * 60 * 60 * 1000,
  };
  return await mergeAuthHeaders(httpApi, token)
    .get(`/tickets?start=${periodicity.start}&end=${periodicity.end}`)
    .then((response) => response.data);
};

export const searchProducts = async (token = "", ref = "") => {
  return await mergeAuthHeaders(httpApi, token)
    .get(`/products?deleted=0&ref=${ref}`)
    .then((response) => response.data);
};

export const registerInventory = async (
  data = {
    user: "63b1484c05f169a5b7ce4878",
    products: [
      {
        id: "63b18ff5548795a1f3468727",
        quantity: 10,
        price: 100,
      },
    ],
  },
  token = ""
) => {
  return await mergeAuthHeaders(httpApi, token)
    .post("/inventories", data)
    .then((response) => response.data);
};

export const registerTicket = async (
  data = {
    user: "", // userId
    products: [
      {
        id: "",
        quantity: 1,
      },
      {
        id: "",
        quantity: 2,
      },
    ],
  },
  token = ""
) => {
  return await mergeAuthHeaders(httpApi, token)
    .post("/tickets", data)
    .then((response) => response.data);
};

export const uploadFile = async (url = "", type = "image/jpg", token = "") => {
  const formData = new FormData();

  const splittedURL = url.split("/");
  const fileName = splittedURL[splittedURL.length - 1];

  formData.append("media", {
    uri: url,
    type,
    name: fileName,
  });

  return await mergeAuthHeaders(httpApi, token)
    .post("/medias", formData)
    .then((response) => response.data);
};

export const linkMedias = async (productId = "", mediaIds = [], token = "") => {
  const data = {
    mediaIds,
  };
  return await mergeAuthHeaders(httpApi, token)
    .post(`/products/${productId}/addMedias`, data)
    .then((response) => response.data);
};

export const unlinkMedias = async (
  productId = "",
  mediaIds = [],
  token = ""
) => {
  const data = {
    mediaIds,
  };
  return await mergeAuthHeaders(httpApi, token)
    .post(`/products/${productId}/removeMedias`, data)
    .then((response) => response.data);
};

export const updateProductPrice = async (
  productId = "",
  price = 0,
  token = ""
) => {
  const data = {
    price,
  };
  return await mergeAuthHeaders(httpApi, token)
    .post(`/products/${productId}/price`, data)
    .then((response) => response.data);
};
