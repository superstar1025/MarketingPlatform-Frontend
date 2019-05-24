import * as React from "react";
import { MutationResult, QueryResult } from "react-apollo";
import { NamespacesConsumer } from "react-i18next";
import isEmpty from "lodash/fp/isEmpty";

import localeNamespaceKeys from "../../../constants/localization";

interface Props {
  mutationResult?: MutationResult<any>;
  queryResult?: QueryResult<any, any>;
}

// TODO: localization
const GraphQLErrors = ({ mutationResult, queryResult }: Props) => {
  const result = mutationResult || queryResult;
  const networkError = result && result.error && result.error.networkError;
  const graphQLErrors = result && result.error && result.error.graphQLErrors;

  return networkError || graphQLErrors ? (
    <NamespacesConsumer ns={[localeNamespaceKeys.formValidation._name]}>
      {(t, { ready }) =>
        ready && (
          <div>
            {!isEmpty(graphQLErrors) && (
              <div className="error-message">
                <div>The following error(s) occurred:</div>
                <ul>
                  {graphQLErrors &&
                    graphQLErrors.map(
                      ({ message }: { message: string }, i: number) => (
                        <li key={i}>{message}</li>
                      )
                    )}
                </ul>
              </div>
            )}

            {networkError && (
              <div className="error-message">
                {t(`${localeNamespaceKeys.formValidation.networkError}`)}
              </div>
            )}
          </div>
        )
      }
    </NamespacesConsumer>
  ) : null;
};

export default GraphQLErrors;
