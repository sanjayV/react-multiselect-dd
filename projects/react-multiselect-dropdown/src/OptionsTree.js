import React from "react";
import OptionsTreeUi from "./style/OptionsTree";
import Select from "./Select";

const filterBySearch = (search, node) => {
    if (search && search !== "" && node && node.text) {
        if (node.text.toLowerCase().search(search.toLowerCase()) > -1) {
            return node;
        } else if (node.child != null) {
            for (let i = 0; i < node.child.length; i++) {
                if (filterBySearch(search, node.child[i])) {
                    return true
                }
            }
            return false
        } else {
            return false;
        }
    }

    return true;
};

export const OptionsTree = ({ data, optionHeight, checkedColor, search, selected, onChange}) => {
    return (<OptionsTreeUi height={optionHeight}>
        {data
            .filter(c => filterBySearch(search, c))
            .map(c => {
                if (c.child) {
                    return (
                        <li key={c.text}>
                            {" "}
                            {selected[c.value] && selected[c.value].status === "indeterminate" ? (
                                <Select
                                    label={c.text}
                                    checkedColor={checkedColor}
                                    indeterminate="true"
                                    onChange={e => onChange(e, c)}
                                />
                            ) : (
                                    <Select
                                        label={c.text}
                                        checkedColor={checkedColor}
                                        checked={
                                            !!(selected[c.value] && selected[c.value].status === "true")
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
                    <li key={c.text}>
                        {" "}
                        {selected[c.value] && selected[c.value].status === "indeterminate" ? (
                            <Select
                                label={c.text}
                                checkedColor={checkedColor}
                                indeterminate="true"
                                onChange={e => onChange(e, c)}
                            />
                        ) : (
                                <Select
                                    label={c.text}
                                    checkedColor={checkedColor}
                                    checked={!!(selected[c.value] && selected[c.value].status === "true")}
                                    onChange={e => onChange(e, c)}
                                />
                            )}
                    </li>
                );
            })}
    </OptionsTreeUi>)
}

