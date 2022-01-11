import { random, lorem } from "faker/locale/fa";

import { Db } from "../utils/types";
import { randomDate } from "../utils/fakerFunctions";

const type = [
  "ایمیل",
  "ایمیل",
  "ایمیل",
  "ایمیل",
  "ایمیل",
  "ایمیل",
  "تماس",
  "تماس",
  "تماس",
  "تماس",
  "تماس",
  "تماس",
  "تماس",
  "تماس",
  "تماس",
  "تماس",
  "تماس",
  "دمو",
  "نهار",
  "جلسه",
  "پیگیری",
  "پیگیری",
  "تشکر",
  "ارسال کردن",
  "دیگر",
];

export const generateTasks = (db: Db) => {
  return Array.from(Array(400).keys()).map((id) => {
    const contact = random.arrayElement(db.contacts);
    return {
      id,
      contact_id: contact.id,
      type: random.arrayElement(type),
      text: lorem.sentence(),
      due_date: randomDate(new Date(contact.first_seen)),
      sales_id: contact.sales_id,
    };
  });
};
