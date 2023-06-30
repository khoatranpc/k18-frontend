import { getColorFromStatusClass, mapStatusToString } from "@/global/init";
import { ItemOverView } from ".";
import { STATUS_CLASS } from "@/global/enum";
import { uuid } from "@/utils";

const hardDataOverView: ItemOverView[] = [
    {
        title: 'Nhân sự',
        data: [
            {
                title: 'Giáo viên',
                value: ['Trần Đăng Khoa']
            },
            {
                title: 'Mentor',
                value: ['Nguyễn Văn Cường', 'Nguyễn Văn Cường', 'Nguyễn Văn Cường', 'Nguyễn Văn Cường', 'Nguyễn Văn Cường']
            },
            {
                title: 'Assistant',
                value: ['Ngọc Tân', 'Ngọc Tân', 'Ngọc Tân', 'Ngọc Tân', 'Ngọc Tân', 'Ngọc Tân']
            },
            {
                title: 'Team phụ trách',
                value: ['18+ HCM']
            },
            {
                title: 'CXO',
                value: ['Thanh Bách', 'Châu Pha']
            }
        ]
    },
    {
        title: 'Hành chính',
        data: [
            {
                title: 'Ngày khai giảng',
                value: ['02/02/2002']
            },
            {
                title: 'Cơ sở',
                value: ['Phạm Ngũ Lão', 'Thành Công', 'Cường NV']
            },
            {
                title: 'Trạng thái',
                value: [<span className="display-block status" key={uuid()} style={{ backgroundColor: getColorFromStatusClass[STATUS_CLASS.RUNNING] }}>{mapStatusToString[STATUS_CLASS.RUNNING]}</span>]
            },
            {
                title: 'Lịch học',
                value: ['T2: 19h15-22h15', 'T6: 14h-17h']
            },
            {
                title: 'Khoá',
                value: ['PMX']
            },
            {
                title: 'Địa điểm',
                value: ['Hà Nội']
            },
            {
                title: 'Hình thức học',
                value: ['Hybrid']
            }
        ]

    },
    {
        title: 'Học viên',
        data: [
            {
                title: 'Sĩ số ban đầu',
                value: ['42']
            },
            {
                title: 'Sĩ số active',
                value: ['39']
            },
            {
                title: 'Số học viên hoàn tất',
                value: ['39']
            },
            {
                title: 'Số học viên chuyển lớp',
                value: ['3']
            }
        ]
    },
    {
        title: 'Lịch học',
        data: []
    }
];
export { hardDataOverView };