import { MockedResponse } from "react-apollo/test-links";

import { authenticationFormFields } from "../constants/formFields";
import {
  RegisterDocument,
  TokenAuthDocument
} from "../typeDefinitions/__generated__/components";

const { login, register } = authenticationFormFields;

export const mockEmail = "test@test.com";
export const mockPassword = "test-password";
export const mockPasswordFail = "fail-password";
export const mockDomainLabel = "mock-domain-label";
export const mockDomainLabelFail = mockDomainLabel + "-fail";
export const mockFirstName = "mock-first-name";
export const mockLastName = "mock-last-name";

export const mockToken = "mock-token";
export const mockGraphQLErrorMessage = "Mock error message";
export const mockGraphQLSuccessMessage = "Mock success message";

const mockErrorResponse = {
  extensions: undefined,
  locations: undefined,
  name: "",
  nodes: undefined,
  originalError: undefined,
  path: undefined,
  positions: undefined,
  source: undefined
};

export const tokenAuthMockSuccess: MockedResponse = {
  request: {
    query: TokenAuthDocument,
    variables: {
      [login.email]: mockEmail,
      [login.password]: mockPassword
    }
  },
  result: {
    data: {
      tokenAuth: {
        token: mockToken
      }
    }
  }
};

export const tokenAuthMockFailure: MockedResponse = {
  request: {
    query: TokenAuthDocument,
    variables: {
      [login.email]: mockEmail,
      [login.password]: mockPasswordFail
    }
  },
  result: {
    data: undefined,
    errors: [{ message: mockGraphQLErrorMessage, ...mockErrorResponse }]
  }
};

export const registerMockSuccess: MockedResponse = {
  request: {
    query: RegisterDocument,
    variables: {
      [register.domainLabel]: mockDomainLabel,
      [register.email]: mockEmail,
      [register.password]: mockPassword,
      [register.firstName]: mockFirstName,
      [register.lastName]: mockLastName
    }
  },
  result: {
    data: {
      register: {
        message: mockGraphQLSuccessMessage,
        success: true
      }
    }
  }
};

export const registerMockFailure: MockedResponse = {
  request: {
    query: RegisterDocument,
    variables: {
      [register.domainLabel]: mockDomainLabelFail,
      [register.email]: mockEmail,
      [register.password]: mockPassword,
      [register.firstName]: mockFirstName,
      [register.lastName]: mockLastName
    }
  },
  result: {
    data: {
      register: {
        message: mockGraphQLErrorMessage,
        success: false
      }
    },
    errors: [{ message: mockGraphQLErrorMessage, ...mockErrorResponse }]
  }
};
