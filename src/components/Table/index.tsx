import React, { useMemo, useState } from 'react';
import { Table as TableComponent } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { INTERNAL_SELECTION_ITEM } from 'antd/es/table/hooks/useSelection';
import { Columns, Obj, RowData } from '@/global/interface';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';
import Loading from '../loading';
import Pagination from '../Pagination';
import styles from '@/styles/Table.module.scss';

interface Props {
    width?: number;
    height?: number;
    className?: string;
    columns: Columns;
    rowData: RowData[];
    customizeSelectionsDropDown?: boolean | INTERNAL_SELECTION_ITEM[] | undefined;
    hideSelectAll?: boolean;
    enableRowSelection?: boolean;
    disableDefaultPagination?: boolean;
    showSizePage?: boolean;
    loading?: boolean;
    classNamePagination?: string;
    enablePaginationAjax?: boolean;
    maxPage?: number;
    bordered?: boolean;
    hasFixedColumn?: boolean;
    handleSelectRow?: (listRowSelected: React.Key[]) => void;
    onChangeDataPagination?: (data: { currentPage: number, currentTotalRowOnPage: number }) => void;
    hanldeClickRow?: (record: Obj, index?: number, e?: React.MouseEvent<any, MouseEvent>) => void;
}

const Table = (props: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const mapColumns = useMemo(() => {
        return props.columns.map((item) => {
            return {
                ...item,
                title: item.className?.includes('hasSort') ? <div className={`${styles.sortHeader} sort`}>{MapIconKey[KEY_ICON.SORT]} {item.title as React.ReactNode}</div> : item.title,
                showSorterTooltip: false
            }
        })
    }, [props.columns]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        props.handleSelectRow?.(newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection: TableRowSelection<Record<string, unknown>> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: props.customizeSelectionsDropDown,
        hideSelectAll: props.hideSelectAll
    };
    return (
        <div className={`tableCustomize ${styles.tableCustomizeAnt} ${props.className ? props.className : ''}`}>
            <TableComponent
                style={{
                    width: '100%'
                }}
                scroll={{
                    x: props.hasFixedColumn ? '100%' : ''
                }}
                bordered={props.bordered}
                dataSource={props.rowData}
                columns={mapColumns}
                rowSelection={props.enableRowSelection ? rowSelection : undefined}
                loading={{
                    spinning: (!props.rowData || props.loading ? true : false),
                    indicator: <Loading className={styles.loadingInTable} />
                }}
                onRow={(record, index) => {
                    return {
                        onClick: (e) => {
                            props.hanldeClickRow?.(record, index, e);
                        }
                    }
                }}
                pagination={props.disableDefaultPagination ? !props.disableDefaultPagination : {}}
            />
            {props.enablePaginationAjax && props.disableDefaultPagination && <Pagination
                className={props.classNamePagination}
                onChangePagination={props.onChangeDataPagination}
                maxPage={props.enablePaginationAjax ? props.maxPage as number : 100}
            />}
        </div>
    )
}
export default Table;