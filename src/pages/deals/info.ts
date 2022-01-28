export const stageNames = {
  opportunity: "ra.deals.opportunity",
  "proposal-sent": "ra.deals.proposalSent",
  "in-negotiation": "ra.deals.inNegotiation",
  won: "ra.deals.won",
  lost: "ra.deals.lost",
  delayed: "ra.deals.delayed",
};

export const stages = [
  "opportunity",
  "in-negotiation",
  "proposal-sent",
  "delayed",
  "won",
  "lost",
];

export const stageChoices = stages.map((type) => ({
  id: type,
  /* @ts-ignore */
  name: stageNames[type],
}));

const types = [
  "ra.deals.printWriting",
  "ra.deals.uiDesign",
  "ra.deals.websiteDesign",
  "ra.deals.others",
];

export const typeChoices = types.map((type) => ({ id: type, name: type }));
