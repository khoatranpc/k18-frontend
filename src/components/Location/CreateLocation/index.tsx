import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Input } from 'antd';

import styles from '@/styles/class/CreateLocation.module.scss';
import Dropdown from '@/components/Dropdown';

interface Props {
    onReceive?: (status: boolean) => void;
}


const CreateLocation = (props: Props) => {
    const [area, setArea] = useState<string>('');
    const locationList = [
        {
            key: "HN",
            label: "Hà Nội"
        },
        {
            key: "HCM",
            label: "Hồ Chí Minh"
        },
        {
            key: "ĐN",
            label: "Đà Nẵng"
        },
    ]
    return (
        <div className={styles.containerCreateClass}>
            <Form>
                <Form.Group className={styles.mb_15}>
                    <Form.Label>Tên cơ sở</Form.Label>
                    <Input type="text" name="codeClass" placeholder="Tên cơ sở" size="middle" className={styles.input} />
                </Form.Group>
                <Form.Group className={styles.mb_15}>
                    <Form.Label>Mã cơ sở:</Form.Label>
                    <Input type="text" name="codeClass" placeholder="Mã cơ sở" size="middle" className={styles.input} />
                </Form.Group>
                <Form.Group className={styles.mb_15}>
                    <Form.Label>Địa chỉ cơ sở</Form.Label>
                    <Input type="text" name="codeClass" placeholder="Địa chỉ cơ sở" size="middle" className={styles.input} />
                </Form.Group>
                <Form.Group className={"w-100"}>
                    <Form.Label>Khu Vực</Form.Label>
                    <Dropdown
                        className={styles.weekday}
                        trigger='click'
                        listSelect={locationList}
                        keyIndex='weekdayTwice'
                        title={area ? area : 'Chọn khu vực'}
                        onClickItem={(e) => {
                            const label = locationList.find((item) => item.key === e.key);
                            setArea(label?.label as string);
                        }}
                    />
                </Form.Group>
                <Button htmlType='submit' className={styles.fl_r}>Tạo lớp</Button>
            </Form>
        </div >
    )
}

export default CreateLocation;