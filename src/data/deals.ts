import { random, lorem } from "faker/locale/fa";
import { add } from "date-fns";

import { Db, Deal } from "../utils/types";
import { randomDate } from "../utils/fakerFunctions";

const type = ["دیگر", "آگهی نویسی", "ui دیزاین", "دیزاین وبسایت"];

const stages = [
  "opportunity",
  "proposal-sent",
  "in-negociation",
  "won",
  "lost",
  "delayed",
];

export const generateDeals = (db: Db): Deal[] => {
  const deals = Array.from(Array(50).keys()).map((id) => {
    const company = random.arrayElement(db.companies);
    company.nb_deals++;
    const contacts = random.arrayElements(
      db.contacts.filter((contact) => contact.company_id === company.id),
      random.number({ min: 1, max: 3 })
    );
    const lowercaseName = lorem.words();
    const created_at = randomDate(new Date(company.created_at)).toISOString();
    return {
      id,
      name: lowercaseName[0].toUpperCase() + lowercaseName.slice(1),
      company_id: company.id,
      contact_ids: contacts.map((contact) => contact.id),
      type: random.arrayElement(type),
      stage: random.arrayElement(stages),
      description: lorem.paragraphs(random.number({ min: 1, max: 4 })),
      amount: random.number(1000) * 100,
      created_at: created_at,
      updated_at: randomDate(new Date(created_at)).toISOString(),
      start_at: randomDate(
        new Date(),
        add(new Date(), { months: 6 })
      ).toISOString(),
      sales_id: company.sales_id,
      index: 0,
      nb_notes: 0,
    };
  });
  // compute index based on stage
  stages.forEach((stage) => {
    deals
      .filter((deal) => deal.stage === stage)
      .forEach((deal, index) => {
        deals[deal.id].index = index;
      });
  });
  return deals;
};
