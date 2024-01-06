import React, { useEffect, useState } from 'react';
import { DeleteOutlined, DownOutlined, FolderAddOutlined, FolderFilled, EditOutlined } from '@ant-design/icons';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Button, Input, Radio, Tree, Popconfirm } from 'antd';
import * as yup from 'yup';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { Obj } from '@/global/interface';
import { useCreateFile, useCreateFolder, useGetListFile, useGetListFolder, useUpdateFile, useUpdateFolder } from '@/utils/hooks';
import { useHookMessage } from '@/utils/hooks/message';
import { uuid } from '@/utils';
import ModalCustomize from '../ModalCustomize';
import Loading from '../loading';
import { findCurrentNode, findNearestParent, listToTreeFnc } from './config';
import styles from '@/styles/Document.module.scss';

enum TypeHandleFile {
    EDIT = 'EDIT',
    NEW_FILE = 'NEW_FILE',
    NEW_FOLDER = 'NEW_FOLDER',
    DELETE = 'DELETE'
}
enum TypeFile {
    FOLDER = 'FOLDER',
    FILE = 'FILE'
}

const validationSchema = yup.object({
    name: yup.string().required('Tên tài liệu là bắt buộc!')
});
interface Props {
    onBin?: boolean;
}
const NewDocument = (props: Props) => {
    const message = useHookMessage();
    const createFolder = useCreateFolder();
    const updateFolder = useUpdateFolder();
    const listFolder = useGetListFolder();
    const createFile = useCreateFile();
    const listFile = useGetListFile();
    const updateFile = useUpdateFile();
    const getListFolder = listFolder.data.response?.data as Obj[] || [];
    const getListFile = listFile.data.response?.data as Obj[] || [];
    const [modal, setModal] = useState<{
        show: boolean,
        name?: string,
        key: string,
        isCreate: boolean,
        content?: string;
    }>({
        show: false,
        name: '',
        key: '',
        isCreate: false
    });
    const { values, touched, errors, setFieldValue, setValues, handleBlur, handleChange, handleSubmit, handleReset } = useFormik({
        initialValues: {
            nodeSelect: '',
            name: '',
            content: '',
            type: TypeFile.FOLDER,
            isDeleted: 0,
            path: ''
        },
        validationSchema,
        onSubmit(values) {
            if (values.type === TypeFile.FOLDER) {
                if (modal.isCreate) {
                    if (!values.nodeSelect) {
                        createFolder.query({
                            body: {
                                ...values,
                                level: 1,
                            }
                        });
                    } else {
                        const crrNode = findCurrentNode(values.nodeSelect, listData);
                        let path = '';
                        let level = 1;
                        let parent = ''
                        if (crrNode && crrNode.type === 'FOLDER') {
                            path = crrNode.path;
                            parent = crrNode._id
                            level = crrNode.level + 1;
                        } else {
                            const parentNode = findNearestParent(treeData, values.nodeSelect, null);
                            if (parentNode) {
                                path = parentNode.path;
                                level = parentNode.level + 1;
                                parent = parentNode._id
                            }
                        }
                        const newFolder = {
                            ...values,
                            path,
                            level,
                            ...parent && { parent }
                        }
                        createFolder.query({
                            body: newFolder
                        });
                    }
                } else {
                    updateFolder.query({
                        body: values,
                        params: [values.nodeSelect]
                    });
                }
            } else {
                if (modal.isCreate) {
                    const crrNode = findCurrentNode(values.nodeSelect, listData);
                    const mapValues: Obj = {
                        ...values
                    };
                    delete mapValues.type;
                    let path = '';
                    let parent = '';
                    if (crrNode && crrNode.type === 'FOLDER') {
                        path = crrNode.path;
                        parent = crrNode._id;
                    } else {
                        const parentNode = findNearestParent(treeData, values.nodeSelect, null);
                        if (parentNode) {
                            path = parentNode.path;
                            parent = parentNode._id;
                        }
                    }
                    const newFile = {
                        ...mapValues,
                        ...path && { path },
                        ...parent && { parent }
                    };
                    createFile.query({
                        body: newFile
                    });
                } else {
                    updateFile.query({
                        body: values,
                        params: [values.nodeSelect]
                    })
                }
            }
        }
    });
    const listData: DataNode[] = getListFolder.map((item) => {
        return {
            ...item,
            key: item._id,
            title: <span className={styles.file}><FolderFilled />{item.name}</span>
        }
    });
    const listFileData: DataNode[] = getListFile.map((item) => {
        return {
            ...item,
            key: item._id,
            title: item.name
        }
    });
    const mappingListData = [...listData, ...listFileData];
    const treeData: DataNode[] = mappingListData.length ? listToTreeFnc(mappingListData) as DataNode[] : [];
    const crrNode = findCurrentNode(values.nodeSelect, mappingListData);

    const confirm = () => {
        if (crrNode) {
            const typeCrrNode = crrNode.type;
            const mapCrrNode: Obj = {
                content: crrNode.content,
                isDeleted: 1,
                name: crrNode.name,
                type: crrNode.type,
            }
            switch (typeCrrNode) {
                case TypeFile.FILE:
                    updateFile.query({
                        body: mapCrrNode,
                        params: [values.nodeSelect]
                    });
                    break;
                case TypeFile.FOLDER:
                    updateFolder.query({
                        body: mapCrrNode,
                        params: [values.nodeSelect]
                    });
                    break;
            }
            setFieldValue('nodeSelect', '');
        }
    };

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        const getKeyNodeSelect = selectedKeys.length ? selectedKeys[0] : '';
        setFieldValue('nodeSelect', getKeyNodeSelect as string);
    };
    const handleCreate = (name: string, content?: string) => {
        setModal({
            isCreate: true,
            key: uuid(),
            name,
            show: true,
            content
        });
    }
    const handleFile = (type: TypeHandleFile) => {
        switch (type) {
            case TypeHandleFile.NEW_FOLDER:
                handleCreate('', '')
                break;
            default:
                break;
        }
    }
    const handleEdit = () => {
        if (crrNode) {
            const getMappingValuesCrrNode = {
                content: crrNode.content,
                name: crrNode.name,
                nodeSelect: crrNode._id,
                type: crrNode.type,
                isDeleted: crrNode.isDeleted,
                path: crrNode.path
            }
            setValues(getMappingValuesCrrNode);
            setModal({
                ...modal,
                show: true,
                isCreate: false,
            });
        }
    }
    const handleQueryData = () => {
        listFolder.query({
            query: {
                isDeleted: 0
            }
        });
        listFile.query({
            query: {
                isDeleted: 0
            }
        });
    }
    useEffect(() => {
        if (createFolder.data.response || createFile.data.response || updateFolder.data.response || updateFile.data.response) {
            message.open({
                content: createFolder.data.response?.message as string || createFile.data.response?.message as string || updateFolder.data.response?.message as string || updateFile.data.response?.message as string,
                type: (createFolder.data.success || createFile.data.success || updateFolder.data.success || updateFile.data.success) ? 'success' : 'error'
            });
            if (createFolder.data.success || createFile.data.success || updateFolder.data.success || updateFile.data.success) {
                if (createFolder.data.success) createFolder.clear?.();
                if (createFile.data.success) createFile.clear?.();
                if (updateFolder.data.success) updateFolder.clear?.();
                if (updateFile.data.success) updateFile.clear?.();
                setModal({
                    ...modal,
                    show: false
                });
                handleQueryData()
            }
            message.close();
        }
    }, [createFolder.data, createFile.data, updateFolder.data, updateFile.data, props.onBin]);
    return (
        <div className={styles.newDocument}>
            <div className={styles.toolbar}>
                <EditOutlined className={styles.icon} onClick={() => {
                    handleEdit();
                }} />
                <FolderAddOutlined className={styles.icon} onClick={() => {
                    handleFile(TypeHandleFile.NEW_FOLDER)
                }} />
                <Popconfirm
                    title="Chú ý"
                    description={values.nodeSelect ? (!props.onBin ? <div>
                        <p>Chuyển <b>{crrNode?.name}</b> vào thùng rác?</p>
                        <span>Điều này có thể chuyển tất cả các file bên trong vào thùng rác nếu là thư mục!</span>
                    </div> : <div>
                        <p>Xác nhận xoá tệp <b>{crrNode?.name}</b>?</p>
                        <span>Điều này sẽ <strong>xoá toàn bộ</strong> file bên trong nếu là thư mục!</span>
                    </div>) :
                        'Hãy chọn tệp trước!'}
                    onConfirm={confirm}
                    okText="Xác nhận"
                    cancelText="Huỷ"
                >
                    <DeleteOutlined className={styles.icon} />
                </Popconfirm>
                <hr />
            </div>
            <div className={styles.treeSelect}>
                {!getListFolder || (!getListFolder && listFolder.data.isLoading) ?
                    <Loading />
                    : <Tree
                        className={styles.tree}
                        showLine
                        switcherIcon={<DownOutlined />}
                        onSelect={onSelect}
                        treeData={treeData}
                    />
                }
            </div>
            <div className={styles.contentDocumentTree}>
                {values.nodeSelect ?
                    (crrNode && crrNode?.content ? < iframe width={'100%'} height={'100%'} src={crrNode.content} /> : <div className={styles.emptyNode}>Tài liệu chưa có nội dung</div>)
                    :
                    <div className={styles.emptyNode}>
                        Lựa chọn tài liệu để xem chi tiết
                    </div>}
            </div>
            {
                modal.show && <ModalCustomize
                    centered
                    size="sm"
                    show={modal.show}
                    modalHeader={<div>{modal.isCreate ? 'Thêm tệp' : 'Cập nhật'}</div>}
                    onHide={() => {
                        setModal({
                            ...modal,
                            show: false
                        });
                        if (modal.isCreate) {
                            handleReset(null);
                        }
                    }}
                >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>
                                Tệp
                            </Form.Label>
                            <br />
                            <Radio.Group value={values.type} name="type" onChange={handleChange}>
                                <Radio value={TypeFile.FOLDER}>Folder</Radio>
                                <Radio value={TypeFile.FILE}>File</Radio>
                            </Radio.Group>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Tên tài liệu <span className="error">*</span>:
                            </Form.Label>
                            <Input placeholder="Tên Folder/File" size="small" value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} />
                            {errors.name && touched.name && <p className="error">{errors.name}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Link nội dung:
                            </Form.Label>
                            <Input placeholder="Link nội dung" size="small" value={values.content} name="content" onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        <Button htmlType="submit" size="small" style={{ marginTop: '1.2rem', float: 'right' }} loading={createFolder.data.isLoading || updateFolder.data.isLoading || createFile.data.isLoading}>{modal.isCreate ? 'Thêm' : 'Cập nhật'}</Button>
                    </Form>
                </ModalCustomize>
            }
        </div>
    )
}

export default NewDocument;