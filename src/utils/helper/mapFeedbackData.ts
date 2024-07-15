// Define types for the data
interface DayRange {
    start: string;
    end: string;
}

interface ClassId {
    dayRange: DayRange;
    _id: string;
    codeClass: string;
    courseId: string;
    courseLevelId: string;
    cxo: string;
    bu: string;
    timeSchedule: string[];
    status: string;
    classForm: string;
    linkZoom: string;
    note: string;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface LocationId {
    _id: string;
    locationCode: string;
    locationDetail: string;
    __v: number;
    locationName: string;
    area: string;
    active: boolean;
}

interface TeacherRegister {
    idTeacher: string;
    roleRegister: string;
    accept: boolean;
    enroll: boolean;
    _id: string;
}

interface ClassData {
    _id: string;
    classId: ClassId;
    locationId: LocationId;
    groupNumber: number;
    totalStudents: number;
    teacherRegister: TeacherRegister[];
    __v: number;
    createdAt: string;
    updatedAt: string;
}

interface Course {
    _id: string;
    courseName: string;
    createdAt: string;
}

interface FeedbackCodeClass {
    _id: string;
    codeClass: string;
    courseId: string;
    createdAt: string;
}

interface FeedbackGroupNumber {
    _id: string;
    groupNumber: number;
    teacherRegister: TeacherRegister[];
    createdAt: string;
}

interface FeedbackId {
    _id: string;
    codeClass: string;
    time: number;
}

interface FeedbackData {
    _id: string;
    studentName: string;
    phoneNumber: string;
    course: Course;
    codeClass: FeedbackCodeClass;
    groupNumber: FeedbackGroupNumber;
    pointCxo: number;
    pointST: number;
    pointMT: number;
    pointOb: number;
    pointSyl: number;
    docDetail: string;
    timeCollect: number;
    feedbackId: FeedbackId;
    createdAt: string;
}

interface OutputFeedback {
    studentName: string;
    pointCxo: number;
    pointMT: number;
    pointOb: number;
    pointST: number;
    pointSyl: number;
    timeCollect: number;
    docDetail: string;
    createdAt: string;
}

interface Output {
    key: string;
    time: string;
    codeClass: string;
    classAveragePoint: number;
    feedbackCount: number;
    teacherPoint: number;
    listFb: OutputFeedback[];
}

// Function to format date
function formatDate(date: string): string {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

// Function to map data
function mapFeedbackData(classData: ClassData[], feedbackData: FeedbackData[]): Output[] {
    return classData.map(classItem => {
        const classId = classItem.classId._id;
        const feedbacks = feedbackData.filter(feedback => feedback.codeClass._id === classId);

        const totalPoints = feedbacks.reduce((sum, feedback) => {
            return sum + (feedback.pointST + feedback.pointMT) / 2;
        }, 0);
        const classAveragePoint = feedbacks.length ? (totalPoints / feedbacks.length).toFixed(2) : '0.00';

        const listFb: OutputFeedback[] = feedbacks.map(feedback => ({
            studentName: feedback.studentName,
            pointCxo: feedback.pointCxo,
            pointMT: feedback.pointMT,
            pointOb: feedback.pointOb,
            pointST: feedback.pointST,
            pointSyl: feedback.pointSyl,
            timeCollect: feedback.timeCollect,
            docDetail: feedback.docDetail,
            createdAt: formatDate(feedback.createdAt)
        }));

        const teacherMTFeedbacks = feedbacks.filter(feedback => feedback.groupNumber.teacherRegister.some(tr => tr.roleRegister === 'MT'));
        const teacherSTFeedbacks = feedbacks.filter(feedback => feedback.groupNumber.teacherRegister.some(tr => tr.roleRegister === 'ST'));

        const teacherMTTotal = teacherMTFeedbacks.reduce((sum, feedback) => sum + feedback.pointMT, 0);
        const teacherSTTotal = teacherSTFeedbacks.reduce((sum, feedback) => sum + feedback.pointST, 0);

        const teacherMTPoint = teacherMTFeedbacks.length ? (teacherMTTotal / teacherMTFeedbacks.length).toFixed(2) : '0.00';
        const teacherSTPoint = teacherSTFeedbacks.length ? (teacherSTTotal / teacherSTFeedbacks.length).toFixed(2) : '0.00';

        const teacherPoint = classItem.teacherRegister.reduce<number>((result, teacher) => {
            if (teacher.roleRegister === 'MT') {
                result = parseFloat(teacherMTPoint);
            } else if (teacher.roleRegister === 'ST') {
                result = parseFloat(teacherSTPoint);
            }
            return result;
        }, 0);

        return {
            key: classId,
            time: formatDate(classItem.classId.dayRange.start),
            codeClass: classItem.classId.codeClass,
            classAveragePoint: parseFloat(classAveragePoint),
            feedbackCount: feedbacks.length,
            teacherPoint: teacherPoint,
            listFb: listFb
        };
    });
}


export default mapFeedbackData