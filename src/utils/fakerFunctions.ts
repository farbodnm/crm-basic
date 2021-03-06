import faker from "faker/locale/fa";

export const weightedArrayElement = (values: any[], weights: any) => {
  faker.random.arrayElement(
    values.reduce(
      (acc, value, index) => acc.concat(new Array(weights[index]).fill(value)),
      []
    )
  );
};

export const weightedBoolean = (likelyhood: number) =>
  faker.datatype.number(99) < likelyhood;

export const randomDate = (minDate?: Date, maxDate?: Date) => {
  const minTs =
    minDate instanceof Date
      ? minDate.getTime()
      : Date.now() - 5 * 365 * 24 * 60 * 60 * 1000;
  const maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
  const range = maxTs - minTs;
  const randomRange = faker.datatype.number({ max: range });
  const ts = Math.sqrt(randomRange / range) * range;
  return new Date(minTs + ts);
};

export const randomFloat = (min: number, max: number) =>
  parseFloat(faker.datatype.number({ min, max, precision: 0.01 }).toFixed(2));
