import React from "react";
import Ul from "./style/CheckboxTree.style";
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

export const CheckboxTree = ({ data, search, selected, onChange }) => (
    <Ul>
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
                            <CheckboxTree
                                data={c.child}
                                search={search}
                                selected={selected}
                                onChange={onChange}
                            />
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
    </Ul>
);
