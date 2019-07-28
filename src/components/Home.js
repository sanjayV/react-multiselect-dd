import React from "react";
import Multiselect from "react-multiselect-dd";

const getSelected = selected => {
    console.log("your selected value is => ", selected);
};

const Home = () => {
    const sampleData = [
        {
            id: 0,
            title: "First-0 First-0 First-0 First-0"
        },
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
                            title: "First.1.1"
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
        },
        {
            id: 10,
            title: "First-10"
        },
        {
            id: 11,
            title: "First-11"
        },
        {
            id: 12,
            title: "First-12"
        },
    ];

    return (
        <React.Fragment>
            <h1>Home page</h1>
            <Multiselect
                data={sampleData}
                onChange={getSelected}
                maxLimitOfSelectedItems={2}
            />
        </React.Fragment>
    );
};

export default Home;
