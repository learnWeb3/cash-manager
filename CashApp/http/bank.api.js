import axios from "axios";
import { env } from "../env/index";
import nacl from "tweetnacl";
import util from "tweetnacl-util";

nacl.util = util;

const httpApi = axios.create({
  baseURL: env.BANK_API_ROOT_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

const mergeAuthHeaders = (axiosInstance, token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axiosInstance;
};

export const login = async (data = { email: "", password: "" }) => {
  return await httpApi
    .post("/sessions", data)
    .then((response) => response.data);
};

export function signTx(
  data = {
    from: "63833ac3ea9def32bab0971b",
    to: "63833ac3ea9def32bab0971b",
    amount: 0,
  },
  base64SecretKey = ""
) {
  const message = JSON.stringify(data);
  //@ts-ignore
  const keyUINT8Array = nacl.util.decodeBase64(base64SecretKey);
  //@ts-ignore
  const messageUINT8Array = nacl.util.decodeUTF8(message);
  //@ts-ignore
  return nacl.util.encodeBase64(
    nacl.sign.detached(messageUINT8Array, keyUINT8Array)
  );
}

export const sendTransaction = async (
  data = {
    from: "63833ac3ea9def32bab0971b",
    to: "63833ac3ea9def32bab0971b",
    amount: 0,
    signature:
      "X0aU1WElTEhSbZRvbYERb4zWEhHuTrzdy9Zkvmq+NzWMVADCjIocBzAuh3n/oR+f6ullrPEFo/ZTs6IFQEUc6mV+YKUgd1mirRVj54PFy8yoISPBvQSJAl4MSRK4w5ZOMB0Gn7NMzrfjlC0GnujOqDXcjHTj2XC61Pjjsu5m36hb7aSvxrBAWyUXv3QgqsjcB71W5M1aknKFj/ttnVxDSrQj49vWnhatcgJ2+12/sH52oXvDtdvzP5Jpn7hXihHPWfgFlMTGxihXRympO5gJBx8ctLXWR0CsV+LjnQ4G7PglmO67rp8BVSk9hbG/MFVzmfDkckX6Nr5DPdDsFLS5fg==\n%",
  },
  token = ""
) => {
  return await mergeAuthHeaders(httpApi, token)
    .post("/transactions", data)
    .then((response) => response.data);
};

export const transactionStatus = {
  PENDING: 1,
  APPROVED: 2,
  INVALID_SIGNATURE_ERROR: 3,
  INSUFFICIENT_BALANCE_ERROR: 4,
};
