import React from "react";
import { QueryResult } from "react-apollo";

import {
  CompanyNodeComponent,
  CompanyNodeQuery,
  CompanyNodeVariables
} from "../../../typeDefinitions/__generated__/components";

interface Props {
  domainId: string;
  children: React.ReactNode;
}

export const CompanyNodeContext = React.createContext<
  QueryResult<CompanyNodeQuery, CompanyNodeVariables> | undefined
>((undefined as any) as QueryResult<CompanyNodeQuery, CompanyNodeVariables>);

const CompanyNodeProvider = (props: Props) => {
  const { domainId } = props;
  if (domainId) {
    return (
      <CompanyNodeComponent variables={{ id: domainId }} >
        {result => {
          return (
            <CompanyNodeContext.Provider value={result}>
              {props.children}
            </CompanyNodeContext.Provider>
          );
        }}
      </CompanyNodeComponent>
    );
  }
  return (
    <CompanyNodeContext.Provider value={undefined}>
      {props.children}
    </CompanyNodeContext.Provider>
  );
};

export default CompanyNodeProvider;
