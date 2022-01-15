import { random, lorem } from "faker/locale/fa";

import { Db } from "../utils/types";
import { randomDate, weightedBoolean } from "../utils/fakerFunctions";

// --champagne-pink: #eddcd2ff;
// --linen: #fff1e6ff;
// --pale-pink: #fde2e4ff;
// --mimi-pink: #fad2e1ff;
// --powder-blue: #c5deddff;
// --mint-cream: #dbe7e4ff;
// --isabelline: #f0efebff;
// --alice-blue: #d6e2e9ff;
// --beau-blue: #bcd4e6ff;
// --pale-cerulean: #99c1deff;

const colors = [
  "#eddcd2",
  "#fff1e6",
  "#fde2e4",
  "#fad2e1",
  "#c5dedd",
  "#dbe7e4",
  "#f0efeb",
  "#d6e2e9",
  "#bcd4e6",
  "#99c1de",
];

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
      done: weightedBoolean(75),
      color: random.arrayElement(colors),
    };
  });
};
