import React from "react";
import OptionsTreeUi from "./style/OptionsTree";
import Select from "./Select";

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

export const OptionsTree = ({ data, optionHeight, checkedColor, search, selected, onChange }) => (
    <OptionsTreeUi height={optionHeight}>
        {data
            .filter(c => filterBySearch(search, c))
            .map(c => {
                if (c.child) {
                    return (
                        <li key={c.title}>
                            {" "}
                            {selected[c.id] && selected[c.id].status === "indeterminate" ? (
                                <Select
                                    label={c.title}
                                    checkedColor={checkedColor}
                                    indeterminate="true"
                                    onChange={e => onChange(e, c)}
                                />
                            ) : (
                                    <Select
                                        label={c.title}
                                        checkedColor={checkedColor}
                                        checked={
                                            !!(selected[c.id] && selected[c.id].status === "true")
                                        }
                                        onChange={e => onChange(e, c)}
                                    />
                                )}
                            <OptionsTree
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
                            <Select
                                label={c.title}
                                checkedColor={checkedColor}
                                indeterminate="true"
                                onChange={e => onChange(e, c)}
                            />
                        ) : (
                                <Select
                                    label={c.title}
                                    checkedColor={checkedColor}
                                    checked={!!(selected[c.id] && selected[c.id].status === "true")}
                                    onChange={e => onChange(e, c)}
                                />
                            )}
                    </li>
                );
            })}
    </OptionsTreeUi>
);
