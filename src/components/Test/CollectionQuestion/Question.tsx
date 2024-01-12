import React, { useEffect } from 'react';
import { Button, Collapse, Input, Radio } from 'antd';
import { useFormik } from 'formik';
import { CaretRightOutlined, DeleteOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
import PickTypeQuestion, { TypeQuestion } from '../PickTypeQuestion';
import styles from '@/styles/Test.module.scss';

interface Options {
    content: string;
    isCorrect: Boolean;
}
interface Question {
    title: string;
    type: keyof typeof TypeQuestion;
    options: Options[];
}
interface Props {
    isCreate?: boolean;
}
const Question = (props: Props) => {
    const { values, setValues, setFieldValue, handleChange, handleSubmit } = useFormik({
        initialValues: {
            question: JSON.parse(localStorage.getItem('quiz') ?? '[]')
        },
        onSubmit(values) {
            console.log(values);
        }
    })
    const handleAddNewQuestion = () => {
        const newQuestion: Question = {
            title: `Câu số ${values.question.length + 1}`,
            type: 'QUIZ',
            options: [{
                content: '',
                isCorrect: false,
            },
            {
                content: '',
                isCorrect: false,
            },
            {
                content: '',
                isCorrect: false,
            },
            {
                content: '',
                isCorrect: false,
            }]
        };
        setFieldValue('question', [...values.question, newQuestion])
    };
    const handleRemove = (index: number) => {
        values.question.splice(index, 1);
        setFieldValue('question', [...values.question]);
    };
    const handleChangeQuestion = (title: string, type: keyof typeof TypeQuestion, idx: number) => {
        const findQuestion = values.question[idx] as Question;
        findQuestion.title = title;
        findQuestion.type = type;
        if (type === 'BOOLEAN') {
            findQuestion.options = [
                {
                    content: '',
                    isCorrect: false,
                },
                {
                    content: '',
                    isCorrect: false,
                }
            ];
        } else {
            findQuestion.options = [
                {
                    content: '',
                    isCorrect: false,
                },
                {
                    content: '',
                    isCorrect: false,
                },
                {
                    content: '',
                    isCorrect: false,
                },
                {
                    content: '',
                    isCorrect: false,
                }
            ];
        }
        setFieldValue('question', [...values.question]);
    };
    const handleChangeOtionsBoolean = (indexCorrect: number, indexQuestion: number) => {
        const findQuestion = values.question[indexQuestion] as Question;
        findQuestion.options[indexCorrect].isCorrect = true;
        findQuestion.options[findQuestion.options.length - indexCorrect - 1].isCorrect = false;
        setFieldValue('question', [...values.question]);
    };
    const handleChangeContentAnswer = (value: string, indexQuestion: number, indexAnswer: number, indexCorrect: number) => {
        const findQuestion = values.question[indexQuestion] as Question;
        findQuestion.options[indexAnswer].content = value;
        setFieldValue('question', [...values.question]);
    }
    const handleChangeRadioQuiz = (index: number, indexQuestion: number,) => {
        const findQuestion = values.question[indexQuestion] as Question;
        findQuestion.options.forEach((item, idx) => {
            if (idx === index) {
                item.isCorrect = true;
            } else {
                item.isCorrect = false;
            }
        });
        setFieldValue('question', [...values.question]);
    }
    useEffect(() => {
        if (props.isCreate) {
            localStorage.setItem('quiz', JSON.stringify(values.question));
        }
    }, [values]);
    return (
        <div className={styles.question}>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                {
                    (values.question as Question[]).map((item, idx) => {
                        return <Panel
                            header={<div className={styles.header} onClick={e => {
                                e.stopPropagation();
                            }}>
                                <Input
                                    size="small"
                                    onChange={(e) => {
                                        handleChangeQuestion(e.target.value as string, item.type, idx);
                                    }}
                                    placeholder="Nhập câu hỏi"
                                    value={item.title}
                                    style={{ width: '90%' }}
                                />
                                <span onClick={e => {
                                    e.stopPropagation();
                                }}>
                                    <PickTypeQuestion
                                        type={item.type}
                                        onChange={(key) => {
                                            handleChangeQuestion(item.title, key as TypeQuestion, idx);
                                        }}
                                        className={styles.pickQuestion}
                                    />
                                </span>
                                <DeleteOutlined onClick={e => {
                                    e.stopPropagation();
                                    handleRemove(idx);
                                }} />
                            </div>}
                            key={idx}
                            className="site-collapse-custom-panel"
                        >
                            {
                                item.type === 'QUIZ' ? <Radio.Group
                                    className={styles.parent}
                                    onChange={(e) => {
                                        handleChangeRadioQuiz(e.target.value, idx);
                                    }}
                                >
                                    {item.options.map((item, radioIndex) => {
                                        return <div className={`${styles[`div${radioIndex + 1}`]} ${styles.answer}`}>
                                            <Input
                                                value={item.content}
                                                onChange={(e) => {
                                                    handleChangeContentAnswer(e.target.value, idx, radioIndex, radioIndex);
                                                }}
                                            />
                                            <Radio className={styles.radio} value={radioIndex} />
                                        </div>
                                    })}
                                </Radio.Group> :
                                    <Radio.Group className={styles.typeBoolean} onChange={(e) => {
                                        handleChangeOtionsBoolean(e.target.value, idx);
                                    }}>
                                        {item.options.map((_, radioIndex) => {
                                            return <Radio key={radioIndex} className={`${styles.radio} ${styles.itemRadio}`} value={radioIndex}>{radioIndex === 0 ? 'True' : 'False'}</Radio>
                                        })}
                                    </Radio.Group>
                            }
                        </Panel>
                    })
                }
            </Collapse>
            <div className={styles.listQuestion}>
                <div className={styles.addQuestion}>
                    <Button onClick={handleAddNewQuestion}>Thêm câu hỏi</Button>
                </div>
            </div>
        </div>
    )
}

export default Question;