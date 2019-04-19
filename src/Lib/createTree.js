import React from "react";
import Checkbox from "./Checkbox";

const filterBySearch = (search, node) => {
    if (search && search !== "") {
        if (node.title.search(search) > -1) {
            return true;
        }
        return false;
    }
    return true;
};

const createTreeNodes = (data, search, selected, onChange) => (
    <ul>
        {data
            .filter(c => filterBySearch(search, c))
            .map(c => {
                if (c.child) {
                    return (
                        <li key={c.title}>
                            {" "}
                            {selected[c.id] && selected[c.id].status === "indeterminate" ? (
                                <Checkbox
                                    label={c.title}
                                    indeterminate="true"
                                    onChange={e => onChange(e, c)}
                                />
                            ) : (
                                    <Checkbox
                                        label={c.title}
                                        checked={
                                            !!(selected[c.id] && selected[c.id].status === "true")
                                        }
                                        onChange={e => onChange(e, c)}
                                    />
                                )}
                            {createTreeNodes(c.child, search, selected, onChange)}
                        </li>
                    );
                }
                return (
                    <li key={c.title}>
                        {" "}
                        {selected[c.id] && selected[c.id].status === "indeterminate" ? (
                            <Checkbox
                                label={c.title}
                                indeterminate="true"
                                onChange={e => onChange(e, c)}
                            />
                        ) : (
                                <Checkbox
                                    label={c.title}
                                    checked={!!(selected[c.id] && selected[c.id].status === "true")}
                                    onChange={e => onChange(e, c)}
                                />
                            )}
                    </li>
                );
            })}
    </ul>
);

export const createTree = (data, search, selected, onChange) => {
    return (
        <React.Fragment>
            {createTreeNodes(data, search, selected, onChange)}
        </React.Fragment>
    );
};
