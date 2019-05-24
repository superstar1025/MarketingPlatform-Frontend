import "jest-dom/extend-expect";
import "jest-localstorage-mock";
import "react-testing-library/cleanup-after-each";
import "jest-canvas-mock";

// createMemoryHistory is used as a reference implementation and may also be used in non-DOM environments, like React Native or tests
import { createMemoryHistory, MemoryHistory } from "history";
import * as React from "react";
import { Router } from "react-router-dom";
import { render } from "react-testing-library";
import { I18nextProvider } from "react-i18next";
import { MockedProvider } from "react-apollo/test-utils";
import { MockedResponse } from "react-apollo/test-links";

import i18n from "i18next";

export interface ITestOptions {
  route?: string;
  history?: MemoryHistory;
}

type UI = React.ReactElement<any>;
type Mocks = ReadonlyArray<MockedResponse>;

interface IRenderTestUtil {
  ui: UI;
  testOptions?: ITestOptions;
  mocks?: Mocks;
}

interface IRerenderTestUtil {
  updatedUI: UI;
  testOptions?: ITestOptions;
  updatedMocks?: Mocks;
}

// https://react.i18next.com/misc/testing#testing-without-stubbing
i18n.init({
  debug: false,
  fallbackLng: "cimode",
  interpolation: {
    escapeValue: false // not needed for react!!
  },
  // react i18next special options (optional)
  react: {
    nsMode: "fallback", // set it to fallback to let passed namespaces to translated hoc act as fallbacks
    wait: false
  },
  resources: {
    en: {},
    es: {}
  },
  saveMissing: false
});

export function renderTestUtil({
  ui,
  testOptions: {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {},
  mocks
}: IRenderTestUtil) {
  const { rerender, ...rest } = render(
    <I18nextProvider i18n={i18n}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>{ui}</Router>
      </MockedProvider>
    </I18nextProvider>
  );
  return {
    ...rest,
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
    rerender: ({ updatedUI, updatedMocks }: IRerenderTestUtil) =>
      rerender(
        <I18nextProvider i18n={i18n}>
          <MockedProvider mocks={updatedMocks} addTypename={false}>
            <Router history={history}>{updatedUI}</Router>
          </MockedProvider>
        </I18nextProvider>
      )
  };
}
