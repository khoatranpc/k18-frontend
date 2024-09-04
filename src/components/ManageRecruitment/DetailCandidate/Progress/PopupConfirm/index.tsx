import React, { useContext, useLayoutEffect, useState } from 'react';
import { Button } from 'antd';
import { Obj } from '@/global/interface';
import { RoundProcess, TemplateMail } from '@/global/enum';
import ModalCustomize from '@/components/ModalCustomize';
import ConfirmContext from '../context';
import MemoTextEditor from '@/components/TextEditor';
import { useGetDetailCandidate, useGetMailTemplate } from '@/utils/hooks';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';
import SelectTe from '@/components/SelectTe';

interface Props {
    header?: React.ReactElement | string;
    show?: boolean;
    title?: React.ReactElement | string;
    children?: React.ReactElement | string;
    step?: RoundProcess;
}

const PopupConfirm = (props: Props) => {
    const confirmModal = useContext(ConfirmContext);
    const templatePassCV = useGetMailTemplate();
    const [labelTe, setLabelTe] = useState('');
    const crrCandidate = useGetDetailCandidate();
    console.log(crrCandidate.data.response?.data);
    useLayoutEffect(() => {
        if (props.step === RoundProcess.CV) {
            templatePassCV.query({
                query: {
                    template: TemplateMail.PASSCV
                }
            });
        }
    }, []);
    return (
        <ModalCustomize
            dialogClassName={styles.modalConfirm}
            modalHeader={confirmModal.title ?? 'Xác nhận'}
            onHide={() => {
                confirmModal.onConfirm?.(confirmModal.round, false);
            }}
            show={props.show}
            centered
            modalFooter={<div className="flex flex-col gap-[1.2rem] items-end">
                <SelectTe
                    size='small'
                    className='w-full'
                    placeholder="TE Xử lý (Sẽ được đính kèm thông tin email!)"
                    onChange={(_, __, data) => {
                        const contactTe = data ? `${data.teName} - ${data.phoneNumber}` : '';
                        setLabelTe(contactTe);
                    }}
                />
                <div className={styles.handleConfirm}>
                    <Button
                        size="small"
                        onClick={() => {
                            confirmModal.onConfirm?.(confirmModal.round, false);
                        }}
                    >
                        Huỷ
                    </Button>
                    <Button size="small"
                        onClick={() => {
                            confirmModal.onConfirm?.(confirmModal.round, true);
                        }}
                    >
                        Đồng ý
                    </Button>
                    {props.step && props.step === RoundProcess.CV && <Button size="small"
                        onClick={() => {
                            confirmModal.onConfirm?.(confirmModal.round, true, TemplateMail.PASSCV);
                        }}
                    >
                        Đồng ý và Gửi mail
                    </Button>
                    }
                </div>
            </div>}
        >
            <div>
                {props.children}
            </div>
        </ModalCustomize>
    )
}

export default PopupConfirm;