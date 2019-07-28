import React from "react";
import Ul from "./style/CheckboxTree.style";
import Checkbox from "./Checkbox";

const filterBySearch = (search, node) => {
    if (search && search !== "") {
        if (node.title.search(search) > -1) {
            return node;
        } else if (node.child != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < node.child.length; i++) {
                result = filterBySearch(search, node.child[i]);
            }
            return result;
        } else {
            return false;
        }
    }

    return true;
};

export const CheckboxTree = ({ data, optionHeight, checkedColor, search, selected, onChange }) => (
    <Ul height={optionHeight}>
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
                                    checkedColor={checkedColor}
                                    indeterminate="true"
                                    onChange={e => onChange(e, c)}
                                />
                            ) : (
                                    <Checkbox
                                        label={c.title}
                                        checkedColor={checkedColor}
                                        checked={
                                            !!(selected[c.id] && selected[c.id].status === "true")
                                        }
                                        onChange={e => onChange(e, c)}
                                    />
                                )}
                            <CheckboxTree
                                data={c.child}
                                checkedColor={checkedColor}
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
                                checkedColor={checkedColor}
                                indeterminate="true"
                                onChange={e => onChange(e, c)}
                            />
                        ) : (
                                <Checkbox
                                    label={c.title}
                                    checkedColor={checkedColor}
                                    checked={!!(selected[c.id] && selected[c.id].status === "true")}
                                    onChange={e => onChange(e, c)}
                                />
                            )}
                    </li>
                );
            })}
    </Ul>
);
