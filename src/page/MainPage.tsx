import { List, Tabs, Typography } from "antd";
import { useAppSelector } from "../app/hooks";
import { Question, User } from "../utils/model";
import { QuestionItem } from "../features/components/QuestionItem";

const filterQuestions = (questions: Question[], user?: User, answered: boolean = false) => {
  if (!user) {
    return [];
  }
  return questions
    .filter(question => answered ? user.answers[question.id] : !user.answers[question.id])
    .sort((a, b) => b.timestamp - a.timestamp);
};

export const MainPage = () => {
  const user = useAppSelector(store => store.user.authedUser);
  const questions = useAppSelector(store => store.question.questionList);

  const unansweredQuestions = filterQuestions(questions, user, false);
  const answeredQuestions = filterQuestions(questions, user, true);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Typography.Title level={3}>Welcome, {user?.name}!</Typography.Title>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Unanswered Questions" key="1">
          <List
            dataSource={unansweredQuestions}
            renderItem={(item) => <QuestionItem question={item} />}
            locale={{ emptyText: "No unanswered questions available." }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Answered Questions" key="2">
          <List
            dataSource={answeredQuestions}
            renderItem={(item) => <QuestionItem question={item} />}
            locale={{ emptyText: "No answered questions available." }}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
