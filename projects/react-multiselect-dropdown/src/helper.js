//import _ from "lodash";

export const updateChildState = (prevState, childs, checked) => {
    if (childs instanceof Array) {
        return childs.reduce((acc, child) => {
            acc[child.value] = { status: checked, ...child };
            if (child.child) {
                return updateChildState(acc, child.child, checked);
            }
            return acc;
        }, prevState);
    }
    return {
        ...prevState,
        [childs.value]: { status: checked, ...childs }
    };
};

export const findInTree = (value, tree) => {
    if (tree.value === value) {
        let path = [tree];
        return { result: tree, path };
    } else if (tree.child !== undefined) {
        for (let children of tree.child) {
            let tmp = findInTree(value, children);
            if (tmp && typeof tmp == 'object' && Object.keys(tmp).length) {
                tmp.path.unshift(tree);
                return tmp;
            }
        }
        return {};
    }
};

export const updateTreeState = (searchPath, updatedSelectedState) => {
    return searchPath.path.reverse().reduce((acc, child) => {
        if (child.child) {
            if (child.child.every(({ value }) => acc[value] && acc[value].status === "true")) {
                return {
                    ...acc,
                    [child.value]: { status: "true", ...child }
                };
            }
            if (
                child.child.some(
                    ({ value }) =>
                        acc[value] &&
                        (acc[value].status === "true" || acc[value].status === "indeterminate")
                )
            ) {
                return {
                    ...acc,
                    [child.value]: { status: "indeterminate", ...child }
                };
            }
            return {
                ...acc,
                [child.value]: { status: "false", ...child }
            };
        }
        return acc;
    }, updatedSelectedState)
};
