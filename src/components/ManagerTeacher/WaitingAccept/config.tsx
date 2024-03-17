import { Columns, } from "@/global/interface";
import { ROLE_TEACHER } from "@/global/enum";
import { formatDatetoString } from "@/utils";
import ConfirmTeacher from "./Confirm";

const getConfigColumns = (): Columns => {
    return [
        {
            key: 'DATE',
            dataIndex: 'dateStartWork',
            title: 'Ngày tham gia',
            fixed: 'left',
            render(value) {
                return formatDatetoString(value as Date, 'dd/MM/yyyy');
            },
            width: 120
        },
        {
            key: 'NAME',
            dataIndex: 'fullName',
            title: 'Họ tên',
            fixed: 'left',
            width: 160,
        },
        {
            key: 'EMAIL',
            dataIndex: 'email',
            title: 'Email',
            width: 250,
        },
        {
            key: 'PHONENUMBER',
            dataIndex: 'phoneNumber',
            title: 'SĐT',
            width: 200,
        },
        {
            key: 'ROLE_REGISTER',
            dataIndex: 'role',
            title: 'Vị trí đăng ký',
            width: 120,
            render(value) {
                return (value as Array<ROLE_TEACHER>).toString();
            }
        },
        {
            key: 'FB',
            dataIndex: 'facebookLink',
            title: 'Facebook',
            width: 90,
            render(value) {
                return <a href={value} style={{ textDecoration: 'underline' }} target="_blank">Link</a>
            }
        },
        {
            key: 'AREA',
            dataIndex: 'area',
            title: 'Khu vực',
            width: 120,
            render(value) {
                return <p>{value.name}</p>
            }
        },
        {
            key: 'ADDRESS',
            dataIndex: 'address',
            title: 'Địa chỉ hiện tại',
            width: 300,
        },
        {
            key: 'CV',
            dataIndex: 'CVfile',
            title: 'CV',
            width: 90,
            render(value) {
                return <a href={value} style={{ textDecoration: 'underline' }} target="_blank">Link</a>
            }
        },
        {
            key: 'ACTION',
            title: 'Thao tác',
            className: 'text-center',
            width: 120,
            fixed: 'right',
            render(value, record) {
                return <ConfirmTeacher record={record} />
            }
        },
    ];
};
export {
    getConfigColumns
}