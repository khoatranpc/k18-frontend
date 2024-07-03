
interface ClassAlertData {
    className: string;
    dayStart: string;
    dayEnd?: string;
    timeOnce: string;
    timeTwice: string;
    cxo?: string;
    classGroupCount: number;
    classGroup: {
        location: string | undefined;
        totalStudents: number;
        note: string;
    }[];
}

const createMessageCreateClass = (data: ClassAlertData): string => {
    const {
        className,
        dayStart,
        dayEnd,
        timeOnce,
        timeTwice,
        cxo,
        classGroupCount,
        classGroup,
    } = data;

    const classGroupsText = classGroup
        .map(
            (group, index) =>
                `    ${index + 1} ${group.location}: ${group.totalStudents} HS - note: ${group.note}`
        )
        .join('\n');

    const text = `<b>Đã có lớp mới được tạo</b>

- <b>Mã lớp</b>: ${className}
- <b>Lịch học</b>: ${timeOnce} - ${timeTwice}
- <b>Lịch khai giảng dự kiến</b>: ${dayStart} -> ${dayEnd}
- <b>Số nhóm</b>: ${classGroupCount}
${classGroupsText}
- <b>CS phụ trách</b>: ${cxo}

Kiểm tra tại: https://client.tms-k18.id.vn/
  `;

    return text;
};



const sendToTeleBot = async (text: string) => {
    const bot_token = process.env.BOT_TELE_TOKEN || "7133414549:AAECmqI7NlH7vp71-m8lkoUbRJRFmKuEUOo";
    const chat_id = process.env.CHAT_ID || "-4183397624";
    const url = `https://api.telegram.org/bot${bot_token}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chat_id,
                text: text,
                parse_mode: "HTML",
            }),
        });

        const data = await response.json();
        console.log("Message sent: ", data);
    } catch (error) {
        console.error("Error sending message: ", error);
    }
};

const teleBot = {
    sendToTeleBot,
    createMessageCreateClass,
};

export default teleBot;
