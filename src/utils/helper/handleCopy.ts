import { message } from "antd";

export const handleCopy = (data: string) => {
    if (data) {
        navigator.clipboard.writeText(data)
            .then(() => {
                message.success('Sao chép thành công');
            })
            .catch(() => {
                message.error('sao chép thất bại');
            });
    }
};