import React, { useRef } from 'react';
import { useCSVReader } from "react-papaparse";
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Obj } from '@/global/interface';
import { Upload } from 'antd';

interface Props {
    handleRowTitleColumn?: (data: string[]) => void;
    onLoadCSV?: (data: Obj[]) => void;
    loadingImport?: boolean;
    processFromServer?: boolean;
    setData?: (file?: File) => void;
}
const CSV = (props: Props) => {
    const { CSVReader } = useCSVReader();
    const inputRef = useRef<HTMLInputElement>(null);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        props.setData?.(file);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }
    return (
        !props.processFromServer ? <CSVReader
            onUploadAccepted={(results: any) => {
                const data = results.data as string[][];
                props.handleRowTitleColumn?.(data[0]);
                const rowColumn = data[0];
                const mappingDatatoJson: Obj[] = [];

                for (let i = 1; i < data.length; i++) {
                    const objectRowData: Obj = {};
                    for (let j = 0; j < data[i].length; j++) {
                        objectRowData[rowColumn[j]] = data[i][j];
                    }
                    mappingDatatoJson.push(objectRowData);
                }
                props.onLoadCSV?.(mappingDatatoJson)
            }}
        >
            {({
                getRootProps,
            }: any) => (
                <button className="btn-import-csv" type='button' {...getRootProps()}>
                    {props.loadingImport ? <LoadingOutlined /> : <UploadOutlined />}  Tải CSV
                </button>
            )}
        </CSVReader> : <button
            disabled={props.loadingImport}
            className="btn-import-csv"
            onClick={() => {
                inputRef.current?.click();
            }}
        >
            {props.loadingImport ? <LoadingOutlined /> : <UploadOutlined />}  Tải CSV
            <input ref={inputRef} className="inputFileCSV" type="file" onChange={onChange} />
        </button>
    )
}

export default CSV;