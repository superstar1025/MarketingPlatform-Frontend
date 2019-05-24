import repeat from "lodash/fp/repeat";

import {
  authenticationFormFields,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH
} from "../../../constants/formFields";
import {
  forgotPasswordValidationSchema,
  loginValidationSchema,
  registerValidationSchema,
  resetPasswordValidationSchema
} from "../../../utils/formValidation/authentication";
import localeNamespaceKeys from "../../../constants/localization";

const {
  login,
  forgotPassword,
  register,
  resetPassword
} = authenticationFormFields;

const { formValidation } = localeNamespaceKeys;

describe(`${registerValidationSchema.name}`, () => {
  const schema = registerValidationSchema();
  const testPassword = "test1234";
  const testFirstName = "first name";
  const testLastName = "last name";
  const testDomain = "domain";
  it("should not validate a schema where the email has whitespace at the beginning", () => {
    schema
      .validate({
        [register.email]: " test@test.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
  });
  it("should not validate a schema where the email has whitespace at the end", () => {
    schema
      .validate({
        [register.email]: "test@test.com ",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
  });
  it("should not validate a schema where the email has whitespace in the middle", () => {
    schema
      .validate({
        [register.email]: "test@ test.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
  });
  it("should not validate a schema where the email is falsy", () => {
    schema
      .validate({
        [register.email]: "",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailRequired]);
      });
  });
  it(`should not validate a schema where the email is greater than ${MAX_EMAIL_LENGTH} characters`, () => {
    schema
      .validate({
        [register.email]: repeat(MAX_EMAIL_LENGTH)("t") + "@t.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailLength]);
      });
  });
  it("should not validate a schema where the password has whitespace at the beginning", () => {
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: " " + testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.noWhitespace]);
      });
  });
  it("should not validate a schema where the password has whitespace at the end", () => {
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword + " ",
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.noWhitespace]);
      });
  });
  it("should not validate a schema where the password has whitespace in the middle", () => {
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: "test password",
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.noWhitespace]);
      });
  });
  it(`should not validate a schema where the password is less than ${MIN_PASSWORD_LENGTH} characters`, () => {
    const shortPassword = repeat(MIN_PASSWORD_LENGTH - 1)("t");
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: shortPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.passwordMinLength]);
      });
  });
  it(`should not validate a schema where the password is greater than ${MAX_PASSWORD_LENGTH} characters`, () => {
    const longPassword = repeat(MAX_PASSWORD_LENGTH + 1)("t");
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: longPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.passwordMaxLength]);
      });
  });
  it("should not validate a schema where the firstName is falsy", () => {
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword,
        [register.firstName]: "",
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.firstNameRequired]);
      });
  });
  it(`should not validate a schema where the firstName is greater than ${MAX_NAME_LENGTH} characters`, () => {
    const longFirstName = repeat(MAX_PASSWORD_LENGTH + 1)("t");
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword,
        [register.firstName]: longFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.firstNameMaxLength]);
      });
  });
  it("should not validate a schema where the lastName is falsy", () => {
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: "",
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.lastNameRequired]);
      });
  });
  it(`should not validate a schema where the lastName is greater than ${MAX_NAME_LENGTH} characters`, () => {
    const longLastName = repeat(MAX_PASSWORD_LENGTH + 1)("t");
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: longLastName,
        [register.domainLabel]: testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.lastNameMaxLength]);
      });
  });
  it("should not validate a schema where the domain is falsy", () => {
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: ""
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.domainRequired]);
      });
  });
  it(`should not validate a schema where the domain is greater than ${MAX_NAME_LENGTH} characters`, () => {
    const longDomain = repeat(MAX_PASSWORD_LENGTH + 1)("t");
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: longDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.lastNameMaxLength]);
      });
  });
  it("should not validate a schema where the domain has whitespace at the beginning", () => {
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: " " + testDomain
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.noWhitespace]);
      });
  });
  it("should not validate a schema where the domain has whitespace at the end", () => {
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: testDomain + " "
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.noWhitespace]);
      });
  });
  it("should not validate a schema where the domain has whitespace in the middle", () => {
    schema
      .validate({
        [register.email]: "test@test.com",
        [register.password]: testPassword,
        [register.firstName]: testFirstName,
        [register.lastName]: testLastName,
        [register.domainLabel]: "dom ain"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.noWhitespace]);
      });
  });
  it("should validate a schema where the email and password are valid", () => {
    const test = {
      [register.email]: "test@test.com",
      [register.password]: testPassword,
      [register.firstName]: testFirstName,
      [register.lastName]: testLastName,
      [register.domainLabel]: testDomain
    };
    schema.validate(test).then(valid => {
      expect(valid).toEqual(test);
    });
  });
});

describe(`${resetPasswordValidationSchema.name}`, () => {
  const schema = resetPasswordValidationSchema();
  const testPassword = "test1234";
  it("should not validate a schema where the password has whitespace at the beginning", () => {
    schema
      .validate({
        [resetPassword.password]: " " + testPassword,
        [resetPassword.passwordConfirm]: " " + testPassword
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.noWhitespace]);
      });
  });
  it("should not validate a schema where the password has whitespace at the end", () => {
    schema
      .isValid({
        [resetPassword.password]: testPassword + " ",
        [resetPassword.passwordConfirm]: testPassword + " "
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.noWhitespace]);
      });
  });
  it("should not validate a schema where the password has whitespace in the middle", () => {
    schema
      .isValid({
        [resetPassword.password]: "test password",
        [resetPassword.passwordConfirm]: "test password"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.noWhitespace]);
      });
  });
  it(`should not validate a schema where the password is less than ${MIN_PASSWORD_LENGTH} characters`, () => {
    const shortPassword = repeat(MIN_PASSWORD_LENGTH - 1)("t");
    schema
      .validate({
        [resetPassword.password]: shortPassword,
        [resetPassword.passwordConfirm]: shortPassword
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.passwordMinLength]);
      });
  });
  it(`should not validate a schema where the password is greater than ${MAX_PASSWORD_LENGTH} characters`, () => {
    const longPassword = repeat(MAX_PASSWORD_LENGTH + 1)("t");
    schema
      .validate({
        [resetPassword.password]: longPassword,
        [resetPassword.passwordConfirm]: longPassword
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.passwordMaxLength]);
      });
  });
  it("should not validate a schema where the passwords do not match", () => {
    schema
      .isValid({
        [resetPassword.password]: testPassword,
        [resetPassword.passwordConfirm]: testPassword + "s"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.passwordDoesntMatch]);
      });
  });
  it("should validate a schema where the password is valid and both password fields match", () => {
    const test = {
      [resetPassword.password]: testPassword,
      [resetPassword.passwordConfirm]: testPassword
    };
    schema.validate(test).then(valid => {
      expect(valid).toEqual(test);
    });
  });
});

describe(`${loginValidationSchema.name}`, () => {
  const schema = loginValidationSchema();
  it("should not validate a schema where email is not a proper email", () => {
    schema
      .validate({
        [login.email]: "test",
        [login.password]: "test"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [login.email]: "test@test",
        [login.password]: "test"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [login.email]: "test.com",
        [login.password]: "test"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [login.email]: "test@test.com ",
        [login.password]: "test"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [login.email]: " test@test.com",
        [login.password]: "test"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [login.email]: "test@ test.com",
        [login.password]: "test"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
  });
  it("should not validate a schema where email is falsy", () => {
    schema
      .isValid({
        [login.email]: "",
        [login.password]: "test"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailRequired]);
      });
  });
  it("should not validate a schema where password is falsy", () => {
    schema
      .isValid({
        [login.email]: "test@test.com",
        [login.password]: ""
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.passwordRequired]);
      });
  });
  it("should validate a schema where email is a valid email and password is truthy", () => {
    const test = {
      [login.email]: "test@test.com",
      [login.password]: "test"
    };
    schema.validate(test).then(valid => {
      expect(valid).toEqual(test);
    });
  });
});

describe(`${forgotPasswordValidationSchema.name}`, () => {
  const schema = forgotPasswordValidationSchema();
  it("should not validate a schema where email is not a proper email", () => {
    schema
      .validate({
        [forgotPassword.email]: "test"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [forgotPassword.email]: "test@test"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [forgotPassword.email]: "test.com"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [forgotPassword.email]: "test@test.com "
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [forgotPassword.email]: " test@test.com"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
    schema
      .validate({
        [forgotPassword.email]: "test@ test.com"
      })
      .catch(err => {
        expect(err.errors).toEqual([formValidation.emailNotValid]);
      });
  });
});
