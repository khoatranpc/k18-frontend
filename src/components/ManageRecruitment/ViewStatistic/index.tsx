import React, { memo, useEffect, useRef } from 'react';
import { Badge, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { StatusProcessing } from '@/global/enum';
import { getStringStatusProcess } from '@/global/init';
import { Obj } from '@/global/interface';
import { getColorByStatusProcess, uuid } from '@/utils';
import { useGetListDataRecruitment } from '@/utils/hooks';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';


interface Props {
    listCandidate: ReturnType<typeof useGetListDataRecruitment>;
    componentId: string;
    handleQuery: () => void;
}
const ViewStatistic = (props: Props) => {
    const listCandidate = props.listCandidate;

    const getDataListCandidate = ((listCandidate.data.response?.data as Obj)?.listData as Obj[]) || [];
    const mapDataTableIndex: Obj = {
    };
    getDataListCandidate.map((item) => {
        if (!mapDataTableIndex[item.statusProcess]) {
            mapDataTableIndex[item.statusProcess] = 0;
        }
        mapDataTableIndex[item.statusProcess]++;
    })
    const listStatus = Object.keys(StatusProcessing).map((item) => {
        return {
            label: getStringStatusProcess[item as StatusProcessing],
            value: item
        }
    });

    return (
        <div className={styles.viewStatistic}>
            {listStatus.map((item, idx) => {
                return <Badge
                    key={idx}
                    count={mapDataTableIndex[item.value] ?? 0}
                    color={getColorByStatusProcess[item.value as keyof typeof StatusProcessing]}
                >
                    <span
                        className={styles.titleStatus}
                    >
                        {item.label}
                    </span>
                </Badge>
            })}
            <Button className={styles.btnReloadStatistic} size="small" onClick={() => {
                props.handleQuery();
            }} >
                <ReloadOutlined style={{ color: 'var(--base)' }} />
            </Button>
        </div>
    )
}

const MemoViewStatistic = memo(ViewStatistic, (prevProps, nextProps) => {
    if (
        (nextProps.listCandidate.data.payload?.query?.query?.componentId === nextProps.componentId)
        ||
        (prevProps.listCandidate.data.payload?.query?.query?.componentId && nextProps.listCandidate.data.payload?.query?.query?.componentId && prevProps.listCandidate.data.payload?.query?.query?.componentId === nextProps.listCandidate.data.payload?.query?.query?.componentId)) {
        return false;
    }
    return true;
})
const BoundaryViewStatistic = () => {
    const listCandidate = useGetListDataRecruitment();
    const componentId = useRef(uuid());
    const handleQuery = () => {
        listCandidate.query(undefined, undefined, ['_id', 'result', 'roundProcess', 'statusProcess', 'courseName'], {
            componentId: componentId.current
        });
    }
    useEffect(() => {
        handleQuery();
    }, []);
    return <MemoViewStatistic listCandidate={listCandidate} componentId={componentId.current} handleQuery={handleQuery} />
}
export default BoundaryViewStatistic;