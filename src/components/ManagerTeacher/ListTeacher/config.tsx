import { Columns, Obj } from "@/global/interface";

const getColums = (styles?: Obj): Columns => {
    return [
        {
            key: 'DATE',
            title: 'Ngày tham gia',
            fixed: 'left',
            width: 120
        },
        {
            key: 'USERNAME',
            title: 'Họ tên',
            fixed: 'left',
            dataIndex: 'fullName',
            width: 180
        },
        {
            key: 'EMAIL',
            title: 'Email',
            width: 180
        },
        {
            key: 'NUMBERPHONE',
            title: 'Điện thoại',
            width: 180
        },
        {
            key: 'SEX',
            title: 'Giới tính',
            width: 90
        },
        {
            key: 'DOB',
            title: 'Ngày sinh',
            width: 120
        },
        {
            key: 'FACEBOOK',
            title: 'Facebook',
            width: 90
        },
        {
            key: 'TAX',
            title: 'MST',
            width: 150
        },
        {
            key: 'IDENTIFY',
            title: 'CCCD/CMTND',
            children: [
                {
                    key: 'IDENTIFY_NUMBER',
                    title: 'Số',
                    width: 200
                },
                {
                    key: 'LICENSE_DATE',
                    title: 'Ngày cấp',
                    width: 120
                },
                {
                    key: 'LICENSE_PLACEMENT',
                    title: 'Nơi cấp',
                    width: 120
                },
            ]
        },
        {
            key: 'AREA',
            title: 'Khu vực',
            width: 120
        },
        {
            key: 'EDUCATION',
            title: 'Trường học/ngành học',
            width: 250
        },
        {
            key: 'WORKUNIT_INDEX',
            title: 'Đơn vị công tác/Vị trí',
            width: 250
        },
        {
            key: 'BACKGROUND',
            title: 'Lý lịch nghề',
            width: 250
        },
        {
            key: 'ADDRESSS',
            title: 'Địa chỉ hiện tại',
            width: 300
        },
        {
            key: 'CV',
            title: 'CV',
            width: 70
        },
        {
            key: 'BANKING',
            title: 'Thông tin ngân hàng',
            children: [
                {
                    key: 'BANKNAME',
                    title: 'Tên',
                    width: 120
                },
                {
                    key: 'BANKNUMBERACCOUNT',
                    title: 'STK',
                    width: 120
                },
                {
                    key: 'BANKHOLDERNAME',
                    title: 'Chủ TK',
                    width: 120
                },
            ]
        },
        {
            key: 'COURSE_REGISTER',
            title: 'Bộ môn ứng tuyển',
            children: [
                {
                    key: 'COURSE',
                    title: 'Bộ môn',
                    width: 90,
                    fixed: 'right',
                },
                {
                    key: 'COURSE_LEVEL',
                    title: 'Cấp độ',
                    width: 120,
                    fixed: 'right',
                }
            ],
        },
        {
            key: 'TEACHERPOINT',
            title: 'Điểm GV',
            fixed: 'right',
            width: 70
        }
    ]
};
export {
    getColums
}