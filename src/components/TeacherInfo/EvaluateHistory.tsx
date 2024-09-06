import React, { useState } from "react";
import { Card, List, Button, Divider, Tag, Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";

interface Evaluation {
  id: number;
  date: string;
  codeClass: string;
  score: number;
  pointSkill: number;
  feedback: string;
}

const evaluationData: Evaluation[] = [
  {
    id: 1,
    date: "01/09/2024",
    codeClass: "ABC123",
    score: 4,
    pointSkill: 5,
    feedback: "The class was excellent, and the skills taught were very useful.",
  },
  {
    id: 2,
    date: "05/09/2024",
    codeClass: "DEF456",
    score: 3,
    pointSkill: 4,
    feedback: "The course was good, but some parts were a bit rushed.",
  },
];

const EvaluateHistory: React.FC = () => {
 
  return (
    <div className="mx-auto p-4">
     
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={evaluationData}
        renderItem={(evaluation) => (
          <List.Item>
            <Card
              title={`${evaluation.codeClass} - ${evaluation.date}`}
            >
              <div className="flex flex-col gap-2">
                <div>
                  <Tag color="blue">Thái độ: {evaluation.score} / 5</Tag>
                </div>
                <div>
                  <Tag color="green">Kỹ năng: {evaluation.pointSkill} / 5</Tag>
                </div>
                <Divider />
                <p className="text-gray-700">
                  {evaluation.feedback.length > 60
                    ? `${evaluation.feedback.substring(0, 60)}`
                    : evaluation.feedback}
                </p>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default EvaluateHistory;
