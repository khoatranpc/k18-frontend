import React from "react";
import { Timeline, Avatar, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const TimelineComponent = () => {
  const events = [
    {
      userName: "User 1",
      time: "2024-08-28 10:00 AM",
      avatarUrl: "https://via.placeholder.com/150",
    },
    {
      userName: "User 2",
      time: "2024-08-28 12:00 PM",
      avatarUrl: "https://via.placeholder.com/150",
    },
    {
      userName: "User 3",
      time: "2024-08-28 02:00 PM",
      avatarUrl: "https://via.placeholder.com/150",
    },
    {
      userName: "User 4",
      time: "2024-08-28 04:00 PM",
      avatarUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Timeline>
      {events.map((event, index) => (
        <Timeline.Item
          key={index}
          dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}
          color="green"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={event.avatarUrl} size="large" />
            <div style={{ marginLeft: "10px" }}>
              <Text strong>{event.userName}</Text>
              <br />
              <Text type="secondary">{event.time}</Text>
            </div>
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default TimelineComponent;
