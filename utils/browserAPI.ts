import qs from "qs";
import { Location } from "history";
import jwtDecode from "jwt-decode";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";

import { ELLIOT_TOKEN } from "../constants/authentication";

interface IQueryLocationURL {
  location?: Location;
  queryParam: string;
}

export const queryLocationURL = ({
  location,
  queryParam
}: IQueryLocationURL) => {
  if (location && location.search) {
    return qs.parse(location.search.substr(1))[queryParam];
  }
  return "";
};

export const getEmailFromToken = () => {
  return flow(
    () => localStorage.getItem(ELLIOT_TOKEN),
    token => jwtDecode(token || ""),
    get("email")
  )();
};

export const logoutRemoveToken = () => localStorage.removeItem(ELLIOT_TOKEN);
