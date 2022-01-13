import { name, internet, random, phone, lorem } from "faker/locale/fa";

import { randomDate, weightedBoolean } from "../utils/fakerFunctions";
import { Db, Contact } from "../utils/types";

const genders = ["مرد", "زن"];
const status = ["cold", "cold", "cold", "warm", "warm", "hot", "in-contract"];
const titles = [
  "مدیر ارشد",
  "مدیر توسعه",
  "مدیر اجرایی",
  "مدیر امور تبلیغلات",
  "مدیر بازاریابی",
  "مدیر فروش",
  "بازرس",
  "مدیر انبار",
  "هماهنگ کننده",
];
const maxContacts = {
  1: 1,
  10: 4,
  50: 12,
  250: 25,
  500: 50,
};

export const generateContacts = (db: Db): Contact[] => {
  const nbAvailblePictures = 223;

  return Array.from(Array(500).keys()).map((id) => {
    const gender = random.arrayElement(genders);
    const first_name = name.firstName(gender as any);
    const last_name = name.lastName();
    const email = internet.email(first_name, last_name);
    const avatar =
      "https://marmelab.com/posters/avatar-" +
      Math.floor(Math.random() * (nbAvailblePictures + 1)) +
      ".jpeg";

    // choose company with people left to know
    let company;
    do {
      company = random.arrayElement(db.companies);
    } while (company.nb_contacts >= maxContacts[company.size]);
    company.nb_contacts++;

    const first_seen = randomDate(new Date(company.created_at)).toISOString();
    const last_seen = first_seen;

    return {
      id,
      first_name,
      last_name,
      gender,
      title: random.arrayElement(titles),
      company_id: company.id,
      email,
      phone_number1: phone.phoneNumber(),
      phone_number2: phone.phoneNumber(),
      background: lorem.sentence(),
      acquisition: random.arrayElement(["inbound", "outbound"]),
      avatar,
      first_seen: first_seen,
      last_seen: last_seen,
      has_newsletter: weightedBoolean(30),
      status: random.arrayElement(status),
      tags: random
        .arrayElements(db.tags, random.arrayElement([0, 0, 0, 1, 1, 2]))
        .map((tag) => tag.id), // finalize
      sales_id: company.sales_id,
      nb_notes: 0,
    };
  });
};
