import vest, { test, enforce } from "vest";

export const validationSuite = vest.create((data = {}) => {
  test("pickFrom", "Address is required", () => {
    enforce(data.pickFrom).isNotEmpty();
  });

  test("pickFrom", "Must be longer than 2 chars", () => {
    enforce(data.pickFrom).longerThan(2);
  });

  test("pickTo", "Address is required", () => {
    enforce(data.pickTo).isNotEmpty();
  });

  test("pickTo", "Must be longer than 2 chars", () => {
    enforce(data.pickTo).longerThan(2);
  });

  test("pickFromDate", "Date is required", () => {
    enforce(data.pickFromDate).isNotEmpty();
  });

  test("pickToDate", "Date is required", () => {
    enforce(data.pickToDate).matches(/[0-9]/);
  });
});
