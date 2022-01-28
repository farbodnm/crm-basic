export const sectors = [
  "ra.companies.communicationSerivces",
  "ra.companies.energy",
  "ra.companies.financials",
  "ra.companies.healthCare",
  "ra.companies.insurance",
  "ra.companies.industrials",
  "ra.companies.informationTechnology",
  "ra.companies.realState",
  "ra.companies.utilities",
].map((sector) => ({ id: sector, name: sector }));

export const sizes = [
  { id: 1, name: "ra.companies.oneEmployee" },
  { id: 10, name: "ra.companies.twoToNineEmployees" },
  { id: 50, name: "ra.companies.tenToFourtynineEmployees" },
  { id: 250, name: "ra.companies.fiftyToTwohundredfourtynineEmployees" },
  { id: 500, name: "ra.companies.moreThanTwoHundredFiftyEmployees" },
];
