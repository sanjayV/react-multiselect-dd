import React from "react";
import Multiselect from "../Lib/Multiselect";

const Home = () => {
  const sampleData = [
    {
      id: 1,
      title: "First",
      child: [
        {
          id: 2,
          title: "First.1",
          child: [
            {
              id: 3,
              title: "Mayank"
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Second",
      child: [
        {
          id: 5,
          title: "Second.1",
          child: [
            {
              id: 6,
              title: "Second.1.1"
            }
          ]
        },
        {
          id: 7,
          title: "Second.2",
          child: [
            {
              id: 8,
              title: "Second.2.1"
            },
            {
              id: 9,
              title: "Second.2.2"
            }
          ]
        }
      ]
    }
  ];
  return (
    <React.Fragment>
      <h1>Home page</h1>
      <Multiselect data={sampleData} />
    </React.Fragment>
  );
};

export default Home;
