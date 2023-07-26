import React from 'react';
import { ROLE_TEACHER } from '@/global/enum';
import Dropdown from '../Dropdown';
import { mapRoleToString } from '@/global/init';

interface Props {
    size?: 'small' | 'large' | 'middle';
}
const SelectRole = (props: Props) => {
    const role: Array<string> = [ROLE_TEACHER.ST, ROLE_TEACHER.MT, ROLE_TEACHER.SP];
    return (
        <Dropdown
            title={'Chọn role'}
            listSelect={role.map((item) => {
                return {
                    key: item,
                    label: mapRoleToString[item as ROLE_TEACHER]
                }
            })}
            sizeButton={props.size}
            trigger={'click'}
        />
    )
}

export default SelectRole;