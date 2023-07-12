import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { querySearchTeacherByEmail } from '@/store/reducers/searchTeacher.reducer';
import { Button, Input, MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Obj, State } from '@/global/interface';
import { mapRoleToString } from '@/global/init';
import { useHandleTeacherInRCBT } from '@/utils/hooks';
import { ROLE_TEACHER } from '@/global/enum';
import { useHookMessage } from '@/utils/hooks/message';
import { AppDispatch, RootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import styles from '@/styles/class/BookTeacher.module.scss';

interface Props {
    requestId: string;
    onSuccess: () => void;
}
const AddTeacher = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const listTeacher = useSelector((state: RootState) => (state.searchTeacher as State).state);
    const mapListSelect: MenuProps['items'] = (listTeacher.response?.data as Array<Obj>)?.map((item) => {
        return {
            key: item._id as string,
            label: item.fullName as string
        }
    }) || [];
    const [teacher, setTeacher] = useState<{
        id: string;
        label: string
    }>({
        id: '',
        label: ''
    });
    const handleSearchTeacher = (value: string) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        email: value
                    }
                }
            }
        }
        dispatch(querySearchTeacherByEmail(payload));
    }
    const { dataHanlde, query, clear } = useHandleTeacherInRCBT();
    const message = useHookMessage();
    const [crrRole, setCrrRole] = useState<ROLE_TEACHER | string>('');
    const role: Array<string> = [ROLE_TEACHER.ST, ROLE_TEACHER.MT, ROLE_TEACHER.SP];
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        options: 'ADD',
                        role: crrRole,
                        idTeacher: teacher.id
                    },
                    params: [props.requestId]
                }
            }
        };
        query(payload);
    }
    useEffect(() => {
        if (dataHanlde.response) {
            if (dataHanlde.success) {
                props.onSuccess();
            }
            message.open({
                content: dataHanlde.response.message as string,
                type: dataHanlde.success ? 'success' : 'error'
            }, 2000);
            message.close(2000, () => {
                clear();
            });
        }
    }, [dataHanlde])
    return (
        <div className={styles.addTeacher}>
            <Form onSubmit={handleSubmit}>
                <label>Giáo viên: {teacher.label}</label>
                <Dropdown
                    title={<Input placeholder="Nhập email giáo viên" onChange={(e) => {
                        handleSearchTeacher(e.target.value);
                    }} />}
                    onClickItem={(e) => {
                        setTeacher({
                            id: e.key,
                            label: (listTeacher.response?.data as Array<Obj>)?.find((item) => item._id === e.key)?.fullName as string
                        });
                    }}
                    trigger={'click'}
                    listSelect={mapListSelect}
                />
                {!teacher.id && <p className="error">Đừng quên chọn GV nhé!</p>}
                <label>Vị trí: {mapRoleToString[crrRole as ROLE_TEACHER]}</label>
                {!crrRole && <p className="error">Hãy chọn vị trí cho GV!</p>}
                <Dropdown
                    title={'Chọn role'}
                    listSelect={role.map((item) => {
                        return {
                            key: item,
                            label: mapRoleToString[item as ROLE_TEACHER]
                        }
                    })}
                    trigger={'click'}
                    onClickItem={(e) => {
                        setCrrRole(e.key)
                    }}
                />
                <Button htmlType="submit" className={styles.btnAddTeacher}>Thêm</Button>
            </Form>
        </div>
    )
}

export default AddTeacher;