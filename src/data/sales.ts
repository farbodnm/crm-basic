import { name, internet } from "faker/locale/fa";

import { Db } from "../utils/types";

export const generateSales = (db: Db) => {
  const randomSales = Array.from(Array(10).keys()).map((id) => {
    const first_name = name.firstName();
    const last_name = name.lastName();
    const email = internet.email(first_name, last_name);

    return {
      id: id + 1,
      first_name,
      last_name,
      email,
    };
  });
  return [
    {
      id: 0,
      first_name: "فربد",
      last_name: "نظری",
      email: "farbod.nm99@gmail.com",
    },
    ...randomSales,
  ];
};
