import React, { useContext } from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { KEY_ICON } from '@/global/enum';
import { MapIconKey } from '@/global/icon';
import { ContextRecruitment } from '../context';
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
    const { modal } = useContext(ContextRecruitment);
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
                    <Button onClick={(() => {
                        modal.update({
                            ...modal.config,
                            isCreate: true,
                            isShow: true,
                            title: 'Thêm mới ứng viên',
                        })
                    })}>Thêm mới</Button>
                </div>
                <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
            </div>
        </div>
    )
}

export default FilterBar;