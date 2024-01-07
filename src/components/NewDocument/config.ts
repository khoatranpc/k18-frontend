import { Obj } from "@/global/interface";
import { arrayToTree } from 'performant-array-to-tree';

const findNearestParent = (tree: Obj[], key: string, parent: Obj | null = null): Obj | null => {
    for (const node of tree) {
        if (node.key === key) {
            return parent;
        }
        if (node.children) {
            const result = findNearestParent(node.children, key, node);
            if (result) {
                return result;
            }
        }
    }
    return null;
};

const listToTreeFnc = (listData: Obj[]) => {
    const newList: Obj[] = [...listData];
    for (let i = 0; i < newList.length; i++) {
        const e = newList[i];
        if (e.parent) {
            const checkHasParentInArray = newList.some(item => item._id === e.parent);
            if (!checkHasParentInArray) {
                delete e.parent
            }
        }
    }
    const tree = arrayToTree(newList, {
        id: '_id',
        parentId: 'parent',
        dataField: null,
    });
    return tree
}
const findCurrentNode = (nodeKey: string, listData: Obj[]) => {
    const crrNode = listData.findIndex(item => item.key === nodeKey);
    return listData[crrNode];
}
export { findNearestParent, findCurrentNode, listToTreeFnc };