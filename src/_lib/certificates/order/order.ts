export interface IOrder {
  id: number;
  name: string;
  ascending: {
    link: string;
    active: boolean;
  };
  descending: {
    link: string;
    active: boolean;
  };
}

export const order: IOrder[] = [
  {
    id: 0,
    name: "organization",
    ascending: {
      link: "organization/asc",
      active: true,
    },
    descending: {
      link: "organization/desc",
      active: false,
    },
  },
  {
    id: 1,
    name: "languageLearnt",
    ascending: {
      link: "languageLearnt/asc",
      active: false,
    },
    descending: {
      link: "languageLearnt/desc",
      active: false,
    },
  },
  {
    id: 2,
    name: "date",
    ascending: {
      link: "date/asc",
      active: false,
    },
    descending: {
      link: "date/desc",
      active: false,
    },
  },
];
