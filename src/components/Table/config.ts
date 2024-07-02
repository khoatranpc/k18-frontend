import { Obj } from "@/global/interface";

const mapTableDataToExcel = (tableRef?: HTMLDivElement) => {
    const listRow = tableRef?.querySelectorAll('tr') as NodeList;
    const listColumns: string[] = [];
    const listData: Obj[] = [];
    for (let i = 0; i < listRow.length; i++) {
        const row = listRow?.[i] as HTMLElement;
        if (row) {
            if (i === 0) {
                const listTh = row.querySelectorAll('th') as NodeListOf<HTMLTableCellElement>;
                for (let j = 0; j < listTh.length; j++) {
                    const getColumn = listTh[j].innerText as string;
                    listColumns.push(getColumn);
                }
            } else {
                const listTd = row.querySelectorAll('td') as NodeListOf<HTMLTableCellElement>;
                const newData: Obj = {};
                for (let j = 0; j < listTd.length; j++) {
                    newData[listColumns[j]] = listTd[j].innerText;
                }
                listData.push(newData);
            }
        }
    }
    return listData;
}

export {
    mapTableDataToExcel
}