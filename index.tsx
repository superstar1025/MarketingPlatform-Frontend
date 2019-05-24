import "react-app-polyfill/ie9";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "react-apollo";

import "./i18n";
import "./";
import Routes from "./Routes";
import { ELLIOT_TOKEN } from "./constants/authentication";
import { apiBaseURL } from "./apiConfig";

import DomainsProvider from "./views/components/Contexts/Domains";
import ModalsProvider from "./views/components/Contexts/Modals";
import UserProvider from "./views/components/Contexts/User";
import AuthTokenProvider from "./views/components/Contexts/Auth";

import UserActionTopBarDropdownProvider from "./views/components/Contexts/UserActionTopBarDropdown";
import TabActiveProvider from "./views/components/Contexts/TabActive";
import CountrySelectProvider from "./views/components/Contexts/CountrySelect";
import CountryRegionProvider from "./views/components/Contexts/CountryRegion";
import SettingInitialProvider from "./views/components/Contexts/SettingInitial";

// IMPORTANT: OUR STYLES MUST BE IMPORTED LAST TO ALLOW US TO OVERRIDE OTHER STYLESHEETS
import "./@uik/styles.css";
import "./assets/icofont/icofont.css";
import "./styles/index.scss";

export const history = createBrowserHistory();

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(ELLIOT_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ""
    }
  };
});

// TODO: look into how we want to actually handle errors, such as sending to Sentry for graphQLErrors or logging user out on networkError
// also look into retries using apollo-link-retry
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const link = errorLink.concat(authLink).concat(
  createUploadLink({
    uri: `${apiBaseURL}/api`
  })
);

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  cache: new InMemoryCache(),
  link
});

export const Root = () => (
  <ApolloProvider client={client}>
    <Router history={history}>
      <AuthTokenProvider>
        <DomainsProvider>
          <UserProvider>
            <UserActionTopBarDropdownProvider>
              <ModalsProvider>
                <TabActiveProvider>
                  <CountrySelectProvider>
                    <CountryRegionProvider>
                      <SettingInitialProvider>
                        <Routes />
                      </SettingInitialProvider>
                    </CountryRegionProvider>
                  </CountrySelectProvider>
                </TabActiveProvider>
              </ModalsProvider>
            </UserActionTopBarDropdownProvider>
          </UserProvider>
        </DomainsProvider>
      </AuthTokenProvider>
    </Router>
  </ApolloProvider>
);


ReactDOM.render(<Root />, document.getElementById("root") as HTMLElement);

// TODO: re-enable this for production environment, not staging though
// registerServiceWorker();
