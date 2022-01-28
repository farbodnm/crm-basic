import { datatype } from "faker";
import { company, internet, address, phone, random } from "faker/locale/fa";

import { randomDate } from "../utils/fakerFunctions";

import { Db, Company } from "../utils/types";

const sectors = [
  "ra.companies.communicationSerivces",
  "ra.companies.energy",
  "ra.companies.financials",
  "ra.companies.healthCare",
  "ra.companies.insurance",
  "ra.companies.industrials",
  "ra.companies.informationTechnology",
  "ra.companies.realState",
  "ra.companies.utilities",
];

const sizes = [1, 10, 50, 250, 500];

const regex = /\w+/;

export const generateCompanies = (db: Db): Company[] => {
  return Array.from(Array(55).keys()).map((id) => {
    const name = company.companyName();
    return {
      id,
      name: name,
      logo: `/logos/${id}.png`,
      sector: random.arrayElement(sectors),
      size: random.arrayElement(sizes) as 1 | 10 | 50 | 250 | 500,
      linkedIn: `https://www.linkedin.com/company/${name
        .toLowerCase()
        .replace(regex, "_")}`,
      website: internet.url(),
      phone_number: phone.phoneNumber(),
      address: address.streetAddress(),
      postalcode: address.zipCode(),
      city: address.city(),
      stateAbbr: address.stateAbbr(),
      nb_contacts: 0,
      nb_deals: 0,
      // at least 1/3rd of companies for Jane Doe
      sales_id: datatype.number(2) === 0 ? 0 : random.arrayElement(db.sales).id,
      created_at: randomDate().toISOString(),
    };
  });
};
