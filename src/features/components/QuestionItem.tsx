import { Typography, Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CustomCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  hoverable?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  children,
  style,
  bodyStyle,
  hoverable = false,
}) => {
  return (
    <div
      style={{
        marginBottom: 16,
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        ...(hoverable && {
          cursor: 'pointer',
          ':hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        }),
        ...style,
      }}
    >
      <div style={{ padding: '16px', ...bodyStyle }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
          {title}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export const QuestionItem = ({ question }: any) => {
  const navigate = useNavigate();

  const viewDetail = () => {
    navigate(`/questions/${question.id}`);
  };

  return (
    <CustomCard
      title={<Typography.Title level={4} style={{ margin: 0 }}>{`Question by ${question.author}`}</Typography.Title>}
      hoverable
      style={{ marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s ease', overflow: 'hidden' }}
      bodyStyle={{ padding: '16px' }}
    >
      <Typography.Paragraph
        ellipsis={{ rows: 2, expandable: false }}
        style={{ fontSize: '16px', fontWeight: 500, color: '#595959' }}
      >
        {question.optionOne.text} or {question.optionTwo.text}?
      </Typography.Paragraph>
      <Button
        type="primary"
        onClick={viewDetail}
        style={{
          borderRadius: 4,
          backgroundColor: '#1677ff',
          borderColor: '#1677ff',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0050b3';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#0050b3';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1677ff';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#1677ff';
        }}
      >
        View Details
      </Button>
    </CustomCard>
  );
};
