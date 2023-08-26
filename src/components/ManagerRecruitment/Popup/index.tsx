import React from 'react';
import { Button, DatePicker, Input, MenuProps, TabsProps } from 'antd';
import { Form } from 'react-bootstrap';
import { ObjectTeach, ROLE_TEACHER } from '@/global/enum';
import ModalCustomize from '@/components/ModalCustomize';
import Tabs from '@/components/Tabs';
import Dropdown from '@/components/Dropdown';
import SelectInputNumber from '@/components/SelectInputNumber';
import SelectLevelTechnique from '@/components/SelectLevelTechnique';
import styles from '@/styles/Recruitment/ManagerRecruitment.module.scss'
import { getStringObjectTeach, mapRoleToString } from '@/global/init';

interface Props {
    isCreate?: boolean;
    show: boolean;
    onHide?: () => void;
    title?: string;
}

const listSelectResourse: MenuProps['items'] = [
    {
        key: 'facebook',
        label: 'Facebook',
    },
    {
        key: 'refer',
        label: 'Gợi ý (Tham khảo)',
    },
    {
        key: 'an',
        label: 'Khác'
    }
];
const statusProcessing: MenuProps['items'] = [
    {
        key: 'DOING',
        label: 'Đang xử lý'
    },
    {
        key: 'UNDONE',
        label: 'Chưa xử lý'
    },
    {
        key: 'DONE',
        label: 'Đã xử lý'
    }
];
const mailingProcessing: MenuProps['items'] = [
    {
        key: 'UNDONE',
        label: 'Chưa mail'
    },
    {
        key: 'DONE',
        label: 'Đã mail'
    }
];
const resultProcessing: MenuProps['items'] = [
    {
        key: 'PASS',
        label: 'Đạt'
    },
    {
        key: 'NOTPASS',
        label: 'Trượt'
    },
];
const roleRegister: MenuProps['items'] = [
    {
        key: ROLE_TEACHER.ST,
        label: mapRoleToString[ROLE_TEACHER.ST]
    },
    {
        key: ROLE_TEACHER.MT,
        label: mapRoleToString[ROLE_TEACHER.MT]
    },
    {
        key: ROLE_TEACHER.SP,
        label: mapRoleToString[ROLE_TEACHER.SP]
    },
]
const listObjectTeach: MenuProps['items'] = [
    {
        key: ObjectTeach.K12,
        label: getStringObjectTeach[ObjectTeach.K12]
    },
    {
        key: ObjectTeach.K18,
        label: getStringObjectTeach[ObjectTeach.K18]
    },
]
const Popup = (props: Props) => {
    const tabsForm: TabsProps['items'] = [
        {
            key: 'RECRUIMENT',
            label: 'Thông tin tuyển dụng',
            children: <div className={styles.infoResourse}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Thời gian ứng tuyển</Form.Label>
                        <br />
                        <DatePicker size="small" rootClassName={styles.popUpDatePicker} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Vị trí</Form.Label>
                        <Dropdown
                            className={styles.selectResourse}
                            trigger="click"
                            listSelect={roleRegister}
                            sizeButton="small"
                            title="Giảng viên"
                            icon
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Nguồn ứng tuyển</Form.Label>
                        <Dropdown
                            className={styles.selectResourse}
                            trigger="click"
                            listSelect={listSelectResourse}
                            sizeButton="small"
                            title="Facebook"
                            icon
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link CV: <a>Link</a></Form.Label>
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Ghi chú</Form.Label>
                        <Input.TextArea />
                    </Form.Group>
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Năm sinh</Form.Label>
                        <br />
                        <DatePicker size="small" rootClassName={styles.popUpDatePicker} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Input type="text" size="small" />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link facebook</Form.Label>
                        <Input type="text" size="small" />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Email</Form.Label>
                        <Input type="text" size="small" />
                    </Form.Group>
                </div>
            </div>
        },
        {
            key: 'SKILL',
            label: 'Kỹ năng',
            children: <div className={styles.skill}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Khối ứng tuyển</Form.Label>
                        <Dropdown
                            className={`${styles.courseRegister}`}
                            trigger="click"
                            listSelect={statusProcessing}
                            sizeButton="small"
                            title="Data"
                            icon
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Số năm kinh nghiệm</Form.Label>
                        <SelectInputNumber step={0.5} className={styles.selectExp} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Trình độ</Form.Label>
                        <SelectLevelTechnique size="small" title="Freshser" className={styles.levelTechnique} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Kỹ năng mềm</Form.Label>
                        <SelectInputNumber max={5} min={0} className={styles.selectExp} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Kinh nghiệm giảng dạy</Form.Label>
                        <SelectInputNumber min={0} className={styles.selectExp} />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Đối tượng giảng dạy</Form.Label>
                        <Dropdown
                            className={`${styles.courseRegister}`}
                            trigger="click"
                            listSelect={listObjectTeach}
                            sizeButton="small"
                            title={getStringObjectTeach[ObjectTeach.K18]}
                            icon
                        />
                    </Form.Group>
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Bằng cấp/Chứng chỉ</Form.Label>
                        <Input.TextArea />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Công nghệ sử dụng</Form.Label>
                        <Input.TextArea />
                    </Form.Group>
                    <Button className={styles.mrAuto}>Đánh giá</Button>
                </div>
            </div>
        },
        {
            key: 'PROCESSING',
            label: 'Tiến độ xử lý',
            children: <div className={styles.processing}>
                <div className={styles.left}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Trạng thái</Form.Label>
                        <Dropdown
                            className={`${styles.statusProcessing}`}
                            trigger="click"
                            listSelect={statusProcessing}
                            sizeButton="small"
                            title="Chưa xử lý"
                            icon
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Gửi mail</Form.Label>
                        <Dropdown
                            className={`${styles.statusProcessing}`}
                            trigger="click"
                            listSelect={mailingProcessing}
                            sizeButton="small"
                            title="Chưa mail"
                            icon
                        />
                    </Form.Group>
                </div>
                <div className={styles.right}>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Lịch PV</Form.Label>
                        <br />
                        <DatePicker
                            size="small"
                        />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Link meet</Form.Label>
                        <Input type="text" size="small" />
                    </Form.Group>
                    <Form.Group className={styles.mb_24}>
                        <Form.Label>Kết quả</Form.Label>
                        <Dropdown
                            className={`${styles.statusProcessing}`}
                            trigger="click"
                            listSelect={resultProcessing}
                            sizeButton="small"
                            title="Đang xử lý"
                            icon
                        />
                    </Form.Group>
                </div>
            </div>
        }
    ]
    return (
        <div className={styles.popup}>
            <ModalCustomize
                onHide={props.onHide}
                show={props.show}
                centered
                modalHeader={<h2>{props.title}</h2>}
            >
                <div className={styles.contentPopup}>
                    <Form className={styles.form}>
                        <Tabs
                            className={styles.tabList}
                            listItemTab={tabsForm}
                        />
                    </Form>
                </div>
            </ModalCustomize>
        </div>
    )
}

export default Popup;