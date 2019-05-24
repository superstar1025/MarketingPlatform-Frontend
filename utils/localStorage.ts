import { ELLIOT_TOKEN } from "../constants/authentication";

export const setToken = (token: string) =>
  localStorage.setItem(ELLIOT_TOKEN, token);

export const getToken = () => localStorage.getItem(ELLIOT_TOKEN);
