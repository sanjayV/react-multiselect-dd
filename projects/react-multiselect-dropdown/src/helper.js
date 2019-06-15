//import _ from "lodash";

export const updateChildState = (prevState, childs, checked) => {
    if (childs instanceof Array) {
        return childs.reduce((acc, child) => {
            acc[child.id] = { status: checked, ...child };
            if (child.child) {
                return updateChildState(acc, child.child, checked);
            }
            return acc;
        }, prevState);
    }
    return {
        ...prevState,
        [childs.id]: { status: checked, ...childs }
    };
};

export const findInTree = (id, tree) => {
    if (tree.id === id) {
        let path = [tree];
        return { result: tree, path };
    } else if (tree.child !== undefined) {
        for (let children of tree.child) {
            let tmp = findInTree(id, children);
            if (tmp && typeof tmp == 'object' && Object.keys(tmp).length) {
                tmp.path.unshift(tree);
                return tmp;
            }
        }
        return {};
    }
};

export const updateTreeState = (searchPath, updatedSelectedState) =>
    searchPath.path.reverse().reduce((acc, child) => {
        if (child.child) {
            if (child.child.every(({ id }) => acc[id] && acc[id].status === "true")) {
                return {
                    ...acc,
                    [child.id]: { status: "true", ...child }
                };
            }
            if (
                child.child.some(
                    ({ id }) =>
                        acc[id] &&
                        (acc[id].status === "true" || acc[id].status === "indeterminate")
                )
            ) {
                return {
                    ...acc,
                    [child.id]: { status: "indeterminate", ...child }
                };
            }
            return {
                ...acc,
                [child.id]: { status: "false", ...child }
            };
        }
        return acc;
    }, updatedSelectedState);
