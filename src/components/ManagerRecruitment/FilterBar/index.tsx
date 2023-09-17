import React, { useContext } from 'react';
import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import { SearchOutlined } from '@ant-design/icons';
import { ComponentPage, KEY_ICON } from '@/global/enum';
import { MapIconKey } from '@/global/icon';
import CombineRoute from '@/global/route';
import { useDispatchDataRouter } from '@/utils/hooks';
import Dropdown from '@/components/Dropdown';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {
    onImport?: () => void;
    onCreate?: () => void;
}
const listFieldFilter = [
    {
        label: 'Khu vực',
        field: 'area',
        value: [
            {
                label: 'Miền Nam',
                value: 'mn'
            },
            {
                label: 'Miền Bắc',
                value: 'mb'
            },
        ]
    },
    {
        label: 'Sắp xếp',
        field: 'sort',
        value: [
            {
                label: 'Mới nhất',
                value: 'ASC'
            },
            {
                label: 'Cũ nhất',
                value: 'DESC'
            },
        ]
    },
    {
        label: 'Thời gian',
        field: 'time'
    },
    {
        label: 'Trạng thái',
        field: 'status',
        value: [
            {
                label: 'Tất cả',
                value: 'all'
            }
        ]
    },
    {
        label: 'Xử lý',
        field: 'proress',
        value: [
            {
                label: 'Tất cả',
                value: 'all'
            }
        ]
    },
    {
        label: 'Nguồn tuyển',
        field: 'resourceHunt',
        value: [
            {
                label: 'Tất cả',
                value: 'all'
            },
            {
                label: 'Facebook',
                value: 'facebook'
            },
            {
                label: 'Linkin',
                value: 'linkin'
            }
        ]
    }
]

const FilterBar = (props: Props) => {
    const router = useRouter();
    const dispatchRouter = useDispatchDataRouter();
    return (
        <div className={styles.filterBar}>
            <div className={styles.listFilter}>
                {
                    listFieldFilter.map((item, idx) => {
                        return <div className={styles.itemFilter} key={idx}>
                            <label>
                                <b>
                                    {item.label}
                                </b>
                            </label>
                            <div className={styles.dropdown}>
                                {item.field !== 'time' &&
                                    <Dropdown
                                        trigger="click"
                                        listSelect={item.value?.map((value) => {
                                            return {
                                                key: value.value,
                                                label: value.label
                                            }
                                        })}
                                        icon
                                        title={<span className={styles.labelField}>{item.value?.[0].label} {MapIconKey[KEY_ICON.CHEVROND]}</span>}
                                    />
                                }
                            </div>
                        </div>
                    })
                }
            </div>
            <div className={styles.fnc}>
                <div className={styles.button}>
                    <Button>Duyệt CSV</Button>
                    <Button onClick={() => {
                        dispatchRouter(CombineRoute['TE']['RECRUITMENT_CREATE_CANDIDATE'], "Tạo ứng viên", "Tạo ứng viên", ComponentPage.RECRUITMENT_CREATE_CANDIDATE, true);
                        router.push(CombineRoute['TE']['RECRUITMENT_CREATE_CANDIDATE']);
                    }}>
                        Tạo ứng viên
                    </Button>
                </div>
                <div className={styles.rightFnc}>
                    <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
                    <Button
                        className={`btn-toolbar ${styles.btnReload}`}
                        onClick={() => {
                        }}
                    >
                        <span className={styles.reload}>{MapIconKey[KEY_ICON.RELOAD]}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FilterBar;