import React, { RefObject, forwardRef, memo, useMemo, useState } from "react";
import { Table as TableComponent, TableProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { INTERNAL_SELECTION_ITEM } from "antd/es/table/hooks/useSelection";
import { Columns, Obj, RowData } from "@/global/interface";
import { MapIconKey } from "@/global/icon";
import { KEY_ICON } from "@/global/enum";
import Loading from "../loading";
import Pagination from "../Pagination";
import styles from "@/styles/Table.module.scss";

interface Props extends TableProps<Obj> {
  width?: number | string;
  height?: number;
  className?: string;
  /**
   * @description should use useMemo
   */
  columns: Columns;
  /**
   * @description should use useMemo
   */
  rowData?: RowData[];
  customizeSelectionsDropDown?: boolean | INTERNAL_SELECTION_ITEM[] | undefined;
  hideSelectAll?: boolean;
  enableRowSelection?: boolean;
  disableDefaultPagination?: boolean;
  showSizePage?: boolean;
  loading?: boolean;
  classNamePagination?: string;
  enablePaginationAjax?: boolean;
  maxPage?: number;
  crrPage?: number;
  rowOnPage?: number;
  bordered?: boolean;
  hasFixedColumn?: boolean;
  size?: "small" | "middle" | "large";
  heightToScroll?: number | string;
  handleSelectRow?: (listRowSelected: React.Key[]) => void;
  onChangeDataPagination?: (data: {
    currentPage: number;
    currentTotalRowOnPage: number;
  }) => void;
  hanldeClickRow?: (
    record: Obj,
    index?: number,
    e?: React.MouseEvent<any, MouseEvent>
  ) => void;
  /**
   * @description
   * onChange: Callback executed when pagination default, filters or sorter is changed
   */
  onChange?: TableProps<Obj>["onChange"];
  ref?: RefObject<Obj | any>;
  detectRerender?: boolean;
}

const Table = forwardRef((props: Props, ref) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const mapColumns: Columns = useMemo(() => {
    return props.columns.map((item) => {
      return {
        ...item,
        title: item.className?.includes("hasSort") ? (
          <div className={`${styles.sortHeader} sort`}>
            {item.title as React.ReactNode} {MapIconKey[KEY_ICON.SORT]}
          </div>
        ) : (
          item.title
        ),
        showSorterTooltip: false,
        children: ((item as any)?.children as Columns)
          ? ((item as any)?.children as Columns).map((child) => {
              return {
                ...child,
                showSorterTooltip: false,
                title: child.className?.includes("hasSort") ? (
                  <div className={`${styles.sortHeader} sort`}>
                    {child.title as React.ReactNode} {MapIconKey[KEY_ICON.SORT]}
                  </div>
                ) : (
                  child.title
                ),
              };
            })
          : null,
      };
    });
  }, [props.columns]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    props.handleSelectRow?.(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<Record<string, unknown>> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: props.customizeSelectionsDropDown,
    hideSelectAll: props.hideSelectAll,
  };
  return (
    <div
      className={`tableCustomize ${styles.tableCustomizeAnt} ${
        props.className ? props.className : ""
      }`}
    >
      <TableComponent
        // rowKey={(record: Record<string, unknown>) => (record.key as string)}
        {...props}
        ref={ref as any}
        style={{
          width: props.width ?? "100%",
          maxWidth: "100%",
          height: props.height ?? "100%",
        }}
        scroll={{
          x: props.hasFixedColumn ? props.width ?? "100%" : "",
          y: props.heightToScroll,
        }}
        size={props.size}
        bordered={props.bordered}
        dataSource={props.rowData ?? props.dataSource}
        columns={mapColumns}
        rowSelection={props.enableRowSelection ? rowSelection : undefined}
        loading={{
          spinning:
            !(props.dataSource ?? props.rowData) || props.loading
              ? true
              : false,
          indicator: <Loading className={styles.loadingInTable} />,
        }}
        onRow={(record, index) => {
          return {
            onClick: (e) => {
              props.hanldeClickRow?.(record, index, e);
            },
          };
        }}
        onChange={props.onChange}
        pagination={
          props.pagination ??
          (props.disableDefaultPagination
            ? !props.disableDefaultPagination
            : {})
        }
      />
      {props.enablePaginationAjax && props.disableDefaultPagination && (
        <Pagination
          rowOnPage={props.rowOnPage}
          showSizePage={props.showSizePage}
          className={props.classNamePagination}
          crrPage={props.crrPage}
          onChangePagination={props.onChangeDataPagination}
          maxPage={props.enablePaginationAjax ? (props.maxPage as number) : 100}
        />
      )}
    </div>
  );
});

Table.displayName = "TableCustomize";
const MemoTable = memo(Table, (prevProps, nextProps) => {
  if (
    nextProps.rowData !== prevProps.rowData ||
    prevProps.dataSource !== nextProps.dataSource
  ) {
    return false;
  }
  if (
    nextProps.loading ||
    nextProps.detectRerender !== prevProps.detectRerender
  )
    return false;
  if (
    (nextProps.rowOnPage && nextProps.rowOnPage !== prevProps.rowOnPage) ||
    (nextProps.crrPage && nextProps.crrPage !== prevProps.crrPage) ||
    (nextProps.maxPage && nextProps.maxPage !== prevProps.maxPage)
  ) {
    return false;
  }
  return true;
});
MemoTable.displayName = "MemoTableCustomize";
export default MemoTable;
