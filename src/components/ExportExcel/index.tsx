import React from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import * as XLSX from 'xlsx';
import { Obj } from '@/global/interface';
import iconExport from '@/assets/svgs/icon-export.svg';

interface Props {
    data?: Obj[];
    fileName?: string;
    sizeBtn?: SizeType;
    onExport?: (exportFnc: (data: Obj[], fileName?: string) => void) => void;
}
const ExportExcel = (props: Props) => {
    const exportToExcel = (data: Obj[], fileName?: string) => {
        // Tạo worksheet từ data
        const worksheet = XLSX.utils.json_to_sheet(data ?? props.data ?? []);

        // Tạo workbook và thêm worksheet vào
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Xuất file
        XLSX.writeFile(workbook, `${fileName ?? props.fileName ?? 'sheet'}.xlsx`);
    };

    return (
        <Button
            className="exportExcel"
            size={props.sizeBtn}
            onClick={() => {
                props.onExport?.(exportToExcel);
            }}
            icon={<Image alt="" src={iconExport} />}
        >
            Excel
        </Button>
    );
}

export default ExportExcel;