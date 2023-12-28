import React from 'react';
import { Form } from 'react-bootstrap';
import { DatePicker, Input } from 'antd';
import { useRouter } from 'next/router';
import { useGetTeById } from '@/utils/hooks';
import CropImage from '@/components/CropImage';
import styles from '@/styles/employee/TE.module.scss';

const PersonalInfo = () => {
    const router = useRouter();
    const currentTe = useGetTeById();
    
    return (
        <div className={styles.personalInfo}>
            <Form>
                <Form.Group>
                    <Form.Label>
                        Ảnh
                    </Form.Label>
                    <CropImage className={styles.cropImage} classNameImgPreview={styles.imageStaff} src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Họ và tên
                    </Form.Label>
                    <Input size="small" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Ngày sinh
                    </Form.Label>
                    <DatePicker size="small" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Input size="small" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        SĐT
                    </Form.Label>
                    <Input size="small" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Vị trí
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Bộ môn
                    </Form.Label>
                </Form.Group>
            </Form>
        </div>
    )
}

export default PersonalInfo;