import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Obj } from '@/global/interface';
import { RoundProcess, TemplateMail } from '@/global/enum';
import useGetCrrUser from '@/utils/hooks/getUser';
import { useGetDetailCandidate, useGetMailTemplate, useMailer, useUpdateDataProcessRoundCandidate } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import SelectTe from '@/components/SelectTe';
import TextEditor from '@/components/TextEditor';
import Send from '@/icons/Send';
import ModalCustomize from '@/components/ModalCustomize';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss';

interface Props {
    round?: TemplateMail;

    handleSend?: (subject: string, html: string) => void;
    statusSendMail?: boolean;
    disabled?: boolean;
    roundId?: string;
    text?: string
}

const SendingMailV2 = (props: Props) => {

    const crrUser = useGetCrrUser()?.data as Obj;
    const getTemplate = props.round || TemplateMail.NOCONNECT
    const mailTemplate = useGetMailTemplate();
    const dataMailtemplate = mailTemplate.data.response?.data as Obj;
    const updateDataRoundProcessCandidate = useUpdateDataProcessRoundCandidate();
    const [teProcess, setTeProcess] = useState<Obj | null>(null);

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');

    const crrCandidate = useGetDetailCandidate();
    const getDataCandidate = crrCandidate.data.response?.data as Obj;

    const [modal, setModal] = useState(false);

    const mailer = useMailer();
    const message = useHookMessage();

    const handleBlur = (newValue: string) => {
        setValue(newValue);
    }
    const handleSubmit = () => {
        mailer.query({
            body: {
                from: "K18",
                toMail: getDataCandidate?.email as string,
                subject: title,
                html: value.replace('{{FACEBOOK}}', `<a href="${teProcess!.facebook}" style="color:#1155cc;">FACEBOOK</a>`),
                round: props.round,
                candidateId: getDataCandidate._id as string
            }
        })
    }
    useEffect(() => {
        mailTemplate.query({
            query: {
                template: getTemplate
            }
        });
    }, [getTemplate]);

    console.log("🚀 ~ SendingMailV2 ~ mailTemplate:", mailTemplate)



    useEffect(() => {
        if (dataMailtemplate && getDataCandidate) {
            setTitle(dataMailtemplate.title);
            const example = dataMailtemplate.html ? String(dataMailtemplate.html).replace('NAME', getDataCandidate?.fullName as string).replace('POSITION', `Giáo viên/Trợ giảng ${getDataCandidate?.courseApply.courseName as string}`).replace('{{TE}}', `${crrUser?.teName} - ${crrUser?.phoneNumber}`) : '';
            setValue(example);
        }
    }, [dataMailtemplate, getDataCandidate]);

    useEffect(() => {
        if (mailer.data.response) {
            message.open({
                type: mailer.data.success ? 'success' : 'error',
                content: mailer.data.success ? 'Gửi thành công' : (mailer.data.response.data as Obj)?.message as string
            });

            mailer.clear?.();
            message.close();
        }
    }, [mailer, props.roundId]);
    return (
        <div className={styles.sendingMailV2}>
            <Button size="small" className={styles.btnSentMailV2} onClick={() => { setModal(true) }}>
                <Send className={styles.iconSentV2} />{props.text || "Gửi Mail"}
                {
                    props.statusSendMail ? <CheckCircleFilled style={{ color: 'var(--success)' }} className={styles.statusSentMail} /> :
                        <CloseCircleFilled style={{ color: 'var(--light-red)' }} className={styles.statusSentMail} />
                }
            </Button>
            {modal &&
                <ModalCustomize
                    size="xl"
                    centered
                    show={modal}
                    onHide={() => {
                        setModal(false);
                        setTeProcess(null);
                    }}
                    modalHeader={<div>Gửi mail tới: {getDataCandidate?.email as string}, TE Xử lý: <SelectTe status={!teProcess ? 'error' : ''} size="small" onChange={(__, _, data) => {
                        if (data) {
                            setTeProcess(data);
                        }
                    }} /></div>}
                >
                    <TextEditor
                        title={title}
                        setTitle={setTitle}
                        hasTitle
                        value={value}
                        onBlur={handleBlur}
                        loadingButton={mailer.data.isLoading}
                        textButton="Gửi"
                        handleSubmit={handleSubmit}
                        disabledSave={!teProcess}
                    />
                </ModalCustomize>}
        </div>
    )
}

export default SendingMailV2;