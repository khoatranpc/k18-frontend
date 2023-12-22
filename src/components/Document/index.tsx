import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetListDocument } from '@/utils/hooks';
import { Obj } from '@/global/interface';
import BlockDocument from './BlockDocument';
import Content from './Content';
import Loading from '../loading';
import Empty from '../Empty';
import styles from '@/styles/Document.module.scss';

const Document = () => {
    const listDocument = useGetListDocument();
    const getListDocument = listDocument.data.response?.data as Obj[];
    const [toggle, setToggle] = useState<boolean>(false);
    const [currentDoc, setCurrentDoc] = useState<Obj>();
    const handleClickItemDoc = (doc: Obj) => {
        setCurrentDoc(doc);
    }
    
    useEffect(() => {
        listDocument.query();
    }, []);
    return (
        <div className={styles.documents}>
            <div className={styles.btn}>
                <Button>Tạo tài liệu</Button>
            </div>
            {listDocument.data.isLoading ? <Loading isCenterScreen /> :
                (getListDocument ? (getListDocument.length === 0 ? <Empty /> :
                    <div className={styles.contentMain}>
                        <div className={`${styles.listDocument} ${toggle ? styles.onToggle : ''}`}>
                            {getListDocument.map((item) => {
                                return <BlockDocument isToggle={toggle} active={currentDoc?._id === item._id} key={item._id} data={item} onClick={() => {
                                    handleClickItemDoc(item)
                                }} />
                            })}
                        </div>
                        <div className={styles.rightContentDocument}>
                            <span className={styles.arrow} onClick={() => {
                                setToggle(!toggle);
                            }}><ArrowLeftOutlined rotate={toggle ? 180 : 0} className={styles.arrowIcon} /></span>
                            <Content doc={currentDoc} isToggle={toggle} />
                        </div>
                    </div>)
                    : <Empty />
                )
            }
        </div>
    )
}

export default Document;