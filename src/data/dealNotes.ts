import { random, lorem } from "faker/locale/fa";

import { Db } from "../utils/types";
import { randomDate } from "../utils/fakerFunctions";
import { datatype } from "faker";

const type = ["ایمیل", "تماس", "تماس", "تماس", "تماس", "جلسه", "یادآوری"];

export const generateDealNotes = (db: Db) => {
  return Array.from(Array(300).keys()).map((id) => {
    const deal = random.arrayElement(db.deals);
    deal.nb_notes++;
    return {
      id,
      deal_id: deal.id,
      type: random.arrayElement(type),
      text: lorem.paragraphs(datatype.number({ min: 1, max: 4 })),
      date: randomDate(
        new Date(db.companies[deal.company_id as number].created_at)
      ).toISOString(),
      sales_id: deal.sales_id,
    };
  });
};
