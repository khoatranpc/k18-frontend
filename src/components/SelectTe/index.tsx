import React, { useEffect } from 'react';
import { Select, SelectProps } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { Obj } from '@/global/interface';
import { useFindGetAllTe } from '@/utils/hooks';
import { shortenName } from '@/utils';
import styles from '@/styles/employee/TE.module.scss';

interface Props extends SelectProps {
    onChange?: (value: any, option: BaseOptionType | BaseOptionType[], data?: Obj) => void;
};
const SelectTe = (props: Props) => {
    const listTe = useFindGetAllTe();
    const getListTe = listTe.data.response?.data as Obj[];
    const options = getListTe?.map((item) => {
        return {
            value: item._id,
            label: `${shortenName(item.teName as string)} - ${item.positionTe}`
        }
    })
    useEffect(() => {
        if (!getListTe) {
            listTe.query({
                query: {
                    getAll: true,
                    condition: {
                        activate: true
                    }
                }
            });
        }
    }, []);
    return (
        <div className={styles.selectTe}>
            <Select
                {...props}
                popupClassName={styles.selectTePopup}
                onChange={(value, option) => {
                    const crrTe = getListTe.find(item => item._id === value as string) as Obj;
                    props.onChange?.(value, option, crrTe);
                }}
                showSearch
                placeholder="Chọn TE tiếp nhận"
                optionFilterProp="label"
                loading={listTe.data.isLoading}
                options={options ?? []}
            />
        </div>
    )
}

export default SelectTe;