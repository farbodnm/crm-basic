export const stageNames = {
  opportunity: "فرصت",
  "proposal-sent": "طرح پیشنهادی ارسال شد",
  "in-negotiation": "درحال مذاکره",
  won: "موفق شده",
  lost: "شکست خورده",
  delayed: "تاخیر افتاده",
};

export const stages = [
  "opportunity",
  "proposal-sent",
  "in-negotiation",
  "won",
  "lost",
  "delayed",
];

export const stageChoices = stages.map((type) => ({
  id: type,
  /* @ts-ignore */
  name: stageNames[type],
}));

const types = ["دیگر", "آگهی نویسی", "ui دیزاین", "دیزاین وبسایت"];

export const typeChoices = types.map((type) => ({ id: type, name: type }));
