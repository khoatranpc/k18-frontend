import React, { useEffect } from 'react';
import { DefaultOptionType, SelectProps } from 'antd/es/select';
import { Select } from 'antd';
import { Obj } from '@/global/interface';
import { useListSubject } from '@/utils/hooks';

interface Props extends SelectProps {
}
const SelectSubjectCourse = (props: Props) => {
    const listSubject = useListSubject();
    const getDataListSubject = listSubject.data.response?.data as Obj[];
    const options: DefaultOptionType[] = (getDataListSubject ?? []).map((item) => {
        return {
            value: item._id,
            label: item.name
        }
    });
    useEffect(() => {
        if (!getDataListSubject) {
            listSubject.query({
                query: {
                    isDeleted: false,
                    isActive: true
                }
            })
        }
    }, []);
    return (
        <div>
            <Select
                options={options}
                placeholder="Chọn khối"
                size="small"
                {...props}
            />
        </div>
    )
}

export default SelectSubjectCourse;