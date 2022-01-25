import { random, lorem } from "faker/locale/fa";
import { add } from "date-fns-jalali";

import { Db, Deal } from "../utils/types";
import { randomDate } from "../utils/fakerFunctions";
import { datatype } from "faker";

const type = [
  "ra.deals.others",
  "ra.deals.printWriting",
  "ra.deals.uiDesign",
  "ra.deals.websiteDesign",
];

const stages = [
  "opportunity",
  "proposal-sent",
  "in-negotiation",
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
      datatype.number({ min: 1, max: 3 })
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
      description: lorem.paragraphs(datatype.number({ min: 1, max: 4 })),
      amount: datatype.number(1000) * 1000000,
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
