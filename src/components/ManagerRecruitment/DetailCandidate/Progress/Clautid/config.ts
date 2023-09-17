import { ClassForm } from "@/global/enum";
import { getClassForm } from "@/global/init";
import { Columns } from "@/global/interface";
import { formatDatetoString } from "@/utils";

const configColumns = (onPopup?: boolean): Columns => {
    const configRenderComment = (comment: string) => {
        if (comment.length > 50) {
            return `${(comment).toString().slice(0, 50)}...`
        }
        return comment;
    }
    return [
        {
            title: 'Mã lớp',
            dataIndex: 'codeClass',
            fixed: 'left',
            width: 90
        },
        {
            title: 'Ngày dự thính',
            dataIndex: 'joinDate',
            render(value) {
                return formatDatetoString(value, 'dd/MM/yyyy');
            },
            width: !onPopup ? 120 : 'auto',
            fixed: 'left',
        },
        {
            title: 'Hình thức',
            dataIndex: 'form',
            width: !onPopup ? 90 : 'auto',
            render(value) {
                return getClassForm[value as ClassForm]
            }
        },
        {
            title: 'Nội dung buổi học',
            dataIndex: 'lessonContent',
            width: 'auto',
            render(value) {
                return !onPopup ? configRenderComment(value) : value;
            }
        },
        {
            title: 'Nhận xét GV (1,5h đầu)',
            dataIndex: 'commentST',
            width: 'auto',
            render(value) {
                return !onPopup ? configRenderComment(value) : value;
            }
        },
        {
            title: 'Nhận xét Mentor (1,5h sau)',
            dataIndex: 'commentMT',
            width: 'auto',
            render(value) {
                return !onPopup ? configRenderComment(value) : value;
            }
        },
        {
            title: 'Góp ý về giáo trình, bài tập',
            dataIndex: 'commentTextbook',
            width: 'auto',
            render(value) {
                return !onPopup ? configRenderComment(value) : value;
            }
        }
    ]
}
export {
    configColumns
}