import { Obj } from '@/global/interface';
import { useDebounce, useListClass } from '@/utils/hooks';
import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../loading';

interface Props {
    onSelect?: (value: string) => void;
    name?: string
}
const SelectClass = (props: Props) => {
    const listClass = useListClass();

    const [search, setSearch] = useState('');
    const firstRender = useRef(true);
    const searchClass = useDebounce(search);
    const [options, setOptions] = useState<DefaultOptionType[]>([]);
    const getListClass = listClass.data.response as Obj;
    const getOptions: Array<DefaultOptionType> = (getListClass?.data?.classes as Obj[])?.map((item) => {
        return {
            label: item.codeClass,
            value: item._id
        }
    });
    useEffect(() => {
        if (!firstRender.current) {
            if (searchClass) {
                listClass.query({
                    query: {
                        codeClass: searchClass,
                        fields: ['codeClass']
                    }
                })
            }
        } else {
            firstRender.current = false;
        }
    }, [searchClass]);
    useEffect(() => {
        if ((getListClass?.data?.classes as Obj[])) {
            setOptions(getOptions);
        }
    }, [listClass.data]);
    return (
        <Select
            loading={listClass.data.isLoading}
            onChange={(value) => {
                props.onSelect?.(value);
            }}
            placeholder="Type to search"
            showSearch
            filterOption={false}
            onSearch={(value) => {
                setSearch(value);
            }}
            notFoundContent={listClass.data.isLoading ? <Loading /> : null}
            options={options}
        />
    )
}

export default SelectClass;