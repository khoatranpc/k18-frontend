import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { Badge, DatePicker, Input } from 'antd';
import { Obj } from '@/global/interface';
import { useGetTeacherDetail } from '@/utils/hooks';
import SelectRole from '@/components/SelectRole';
import styles from '@/styles/teacher/DetailTeacher.module.scss';
import { MapIconKey } from '@/global/icon';
import { KEY_ICON } from '@/global/enum';

interface Props {
    countRole: number;
}
const TeacherInfo = (props: Props) => {
    const currentTeacher = useGetTeacherDetail();
    const firstInitvalues = useRef(true);
    const getDataTeacher = (currentTeacher.data.response?.data as Obj);
    const { values, errors, touched, setValues, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: getDataTeacher,
        onSubmit(values) {

        }
    });
    useEffect(() => {
        if (currentTeacher.data.response && currentTeacher.data.success && firstInitvalues.current) {
            setValues((currentTeacher.data.response.data as Obj));
        }
    }, [currentTeacher.data]);
    return (
        <div className={styles.overViewTeacherInfo}>
            <Form className={styles.formInfo}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Họ tên:</Form.Label>
                        <Input value={values?.fullName} type="email" name="fullName" placeholder="Họ tên" size="small" className={styles.input} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Khu vực:</Form.Label>
                        <Input value={values?.area} type="email" name="area" placeholder="Khu vực" size="small" className={styles.input} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Email:</Form.Label>
                        <Input value={values?.email} type="email" name="email" placeholder="Email" size="small" className={styles.input} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Ngày sinh:</Form.Label>
                        <br />
                        <DatePicker size="small" name="dob" value={dayjs(values?.dob as Date || new Date())} format={'DD/MM/YYYY'} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số ĐT:</Form.Label>
                        <Input value={values?.phoneNumber} type="text" name="phoneNumber" size="small" className={styles.input} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link Facebook:</Form.Label>
                        <Input value={values?.facebookLink} type="text" name="facebookLink" size="small" className={styles.input} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link CV:</Form.Label>
                        <Input value={values?.CVfile} type="text" name="CVfile" size="small" className={styles.input} />
                    </Form.Group>
                    <br />
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Mã số thuế:</Form.Label>
                        <Input value={values?.taxCode} type="text" name="taxCode" placeholder="VD:000000" size="small" className={styles.input} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Tên ngân hàng:</Form.Label>
                        <Input value={values?.bankName} type="text" name="bankName" placeholder="VD: VP Bank" size="small" className={styles.input} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số tài khoản:</Form.Label>
                        <Input value={values?.bankNumber} type="text" name="bankNumber" placeholder="VD: 08765213" size="small" className={styles.input} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Chủ tài khoản:</Form.Label>
                        <Input value={values?.bankHolderName} type="text" name="bankHolderName" placeholder="VD: Mindx Technology" size="small" className={styles.input} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <div className={styles.titleRole}>
                            <Form.Label>Vị trí:</Form.Label>
                            {
                                props.countRole < 3 && <span className={styles.icon}>
                                    {MapIconKey[KEY_ICON.PLCR]}
                                </span>
                            }
                        </div>
                        <div className={styles.roleRegister}>
                            {values?.roleIsST && <SelectRole
                                title="ST"
                            />}
                            {values?.roleIsMT && <SelectRole
                                title="MT"
                            />}
                            {values?.roleIsSP && <SelectRole
                                title="SP"
                            />}
                        </div>
                    </Form.Group>
                </div>
            </Form>
        </div>
    )
}

export default TeacherInfo;