import vest, { test, enforce } from "vest";
export const validationSuite = vest.create((data = {}) => {
  if (data.name) {
    test("name", "Name is required", () => {
      enforce(data.name).isNotEmpty();
    });

    test("name", "Must be longer than 3 chars", () => {
      enforce(data.name).longerThan(3);
    });
  }

  test("email", "Email is required", () => {
    enforce(data.email).isNotEmpty();
  });

  test("email", "Email Address is not valid", () => {
    enforce(data.email).matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  });

  test("password", "Password is required", () => {
    vest.warn();
    enforce(data.password).isNotEmpty();
  });

  test("password", "Password must be at least 5 chars", () => {
    enforce(data.password).longerThanOrEquals(5);
  });

  test("password", "Password must contain a digit", () => {
    enforce(data.password).matches(/[0-9]/);
  });

  test("password", "Password must contain a symbol", () => {
    enforce(data.password).matches(/[^A-Za-z0-9]/);
  });

  if (data.confirm_password) {
    test("confirm_password", "Confirm Password is required", () => {
      enforce(data.confirm_password).isNotEmpty();
    });

    test(
      "confirm_password",
      "Confirm Password must be at least 5 chars",
      () => {
        enforce(data.password).longerThanOrEquals(5);
      }
    );

    test("confirm_password", "Confirm Password must contain a digit", () => {
      enforce(data.password).matches(/[0-9]/);
    });

    test("confirm_password", "Confirm Password must contain a symbol", () => {
      enforce(data.password).matches(/[^A-Za-z0-9]/);
    });

    if (data.password) {
      test("confirm_password", "Passwords do not match", () => {
        enforce(data.confirm_password).equals(data.password);
      });
    }
  }
});
