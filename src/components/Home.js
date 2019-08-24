import React from "react";
import Multiselect from "react-multiselect-dd";

const getSelected = selected => {
    console.log("your selected value is => ", selected);
};

const Home = () => {
    const sampleData = [
        {
            text: "First-0 First-0 First-0 First-0",
            value: 0
        },
        {
            text: "First",
            value: 1,
            child: [
                {
                    text: "First.1",
                    value: 2,
                    child: [
                        {
                            text: "First.1.1",
                            value: 3
                        }
                    ]
                }
            ]
        },
        {
            text: "Second",
            value: 4,
            child: [
                {
                    text: "Second.1",
                    value: 5,
                    child: [
                        {
                            text: "Second.1.1",
                            value: 6
                        }
                    ]
                },
                {
                    text: "Second.2",
                    value: 7,
                    child: [
                        {
                            text: "Second.2.1",
                            value: 8
                        },
                        {
                            text: "Second.2.2",
                            value: 9
                        }
                    ]
                }
            ]
        },
        {
            text: "First-10",
            value: 10
        },
        {
            text: "First-11",
            value: 11
        },
        {
            text: "First-12",
            value: 12
        }
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
