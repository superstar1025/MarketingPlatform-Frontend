import get from "lodash/fp/get";
import flow from "lodash/fp/flow";
import isNumber from "lodash/fp/isNumber";
import isArray from "lodash/fp/isArray";
import { ApolloCurrentResult } from "apollo-boost";
import { format } from "date-fns";

import { DropDownItems, DomainNodeConnection } from "../typeDefinitions";

import { ApolloResult } from "../typeDefinitions";
import {
  defaultDropDownValue,
  genderCodesAndLabels
} from "../constants/catalog";
import { queryNames } from "../constants/graphql";

export const extractDataFromResult = (result: ApolloResult) =>
  get("data")(result);

export const extractDropdownValue = (
  dropdownItem?: DropDownItems | number | string
) => {
  if (isNumber(dropdownItem)) {
    return dropdownItem;
  }
  if (isArray(dropdownItem)) {
    const value = get("0.value")(dropdownItem);
    return value ? value : defaultDropDownValue;
  }
  return defaultDropDownValue;
};

export const extractNode = (edges: { node?: any }[]) => {
  if (edges) {
    return edges.map(edge => edge.node);
  }
  return [];
};

export const extractDomains = (domainNodeConnection: DomainNodeConnection) => {
  return (
    flow(
      get("edges"),
      extractNode
    )(domainNodeConnection) || []
  );
};

export const extractApolloData = (
  result?: ApolloCurrentResult<any>,
  callName?: string
) => {
  return get(`data.${callName}`)(result);
};

export const getDomainsFromApolloResult = (
  domainsResult?: ApolloCurrentResult<any>
) =>
  flow(
    () => extractApolloData(domainsResult, queryNames.domains),
    extractDomains
  )();

const getUTCDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const displayUTCTimestamp = (datetime: string) =>
  format(getUTCDate(datetime), "MMMM DD, YYYY (h:mm:ss:A [GMT] Z)"); // returns UTC time

export const getGenderByNumber = (number: number) => {
  if (isNumber(number)) {
    const gender = genderCodesAndLabels.find(unit => unit.id === number);
    return gender ? gender.label : null;
  }
  return null;
};
