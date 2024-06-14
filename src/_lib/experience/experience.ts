interface IExperience {
  id: number;
  year: {
    start: string;
    current?: string;
    end: string | number;
  };
  className: string;
  description: {
    title: string;
    descriptionMore: string;
  };
}
const today = new Date().getFullYear();
export const experiences: IExperience[] = [
  {
    id: 0,
    year: {
      start: "2014",
      end: "2018",
    },
    className: "school",
    description: {
      title: "Graduate School",
      descriptionMore:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, consequuntur provident doloremque fuga aperiam odit architecto similique ipsum quis labore?",
    },
  },
  {
    id: 1,
    year: {
      start: "2019",
      end: "2023",
    },
    className: "",
    description: {
      title: "First Job",
      descriptionMore:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quos, consequuntur provident doloremque fuga aperiam odit architecto similique ipsum quis labore?",
    },
  },
  {
    id: 2,
    year: {
      start: "2023",
      current: "current",
      end: today,
    },
    className: "school",
    description: {
      title: "Learning",
      descriptionMore:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis facilis quas architecto, ducimus minus odit. Cum sunt consequatur dignissimos cumque officiis quo error culpa, suscipit eos quae porro deserunt architecto debitis nobis ex quod omnis tempore quidem deleniti, veniam minima aspernatur sequi. Saepe quam sunt alias illum, reiciendis enim fuga expedita laboriosam quas aliquam sapiente perspiciatis, consequuntur nulla placeat dolor culpa ad dicta? Quod repudiandae eum cupiditate fugiat quam sed! Placeat officia voluptas quas dolor doloribus numquam, quis nulla? Vero earum officiis eius consequuntur voluptas, unde recusandae totam iste ipsa, modi expedita doloribus nam esse natus provident hic debitis nesciunt libero neque minus officia ex? Qui accusamus repellat fugiat, molestias laboriosam accusantium nostrum veritatis nulla, odit excepturi esse, cumque iure dolores. Libero vel provident nemo, iusto ullam quod reprehenderit possimus corporis iure quisquam maxime aut veritatis optio perferendis officia porro, minus a impedit nesciunt! Nobis et beatae perspiciatis fuga iste vel facilis adipisci corrupti eveniet voluptatum ab dolores repellat provident sed maiores, cumque vero veritatis enim laudantium saepe a, error recusandae. Reiciendis nobis vel reprehenderit unde quam quas facere aut recusandae animi deleniti quidem officia eveniet in nesciunt ea, adipisci magnam. Aperiam similique itaque perspiciatis modi, sunt quis beatae cum!",
    },
  },
];
