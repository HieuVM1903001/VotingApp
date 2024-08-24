import { Image, List, Typography, Card } from "antd";
import { useAppSelector } from "../app/hooks";
import { User } from "../utils/model";

export const LeaderBoardPage = () => {
  const users = useAppSelector((store) => store.user.users);

  const rank = (user: User): number => {
    return user.questions.length + Object.keys(user.answers).length;
  };

  const sortedUsers = [...users].sort((a, b) => rank(b) - rank(a));

  return (
    <List
      dataSource={sortedUsers}
      renderItem={(item) => (
        <List.Item>
          <Card 
            style={{ width: "100%" }} 
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={item.avatarURL || undefined}
                  alt="Avatar"
                  width={50}
                  height={50} 
                  style={{ 
                    marginRight: 16, 
                    objectFit: "cover",  
                    borderRadius: "50%", 
                    overflow: "hidden"  
                  }}
                />
                <Typography.Text>{item.name}</Typography.Text>
              </div>
            }
          >
            <Typography.Paragraph>
              <strong>Questions Asked:</strong> {item.questions.length}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Answers Given:</strong> {Object.keys(item.answers).length}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Total Score:</strong> {rank(item)}
            </Typography.Paragraph>
          </Card>
        </List.Item>
      )}
    />
  );
};
