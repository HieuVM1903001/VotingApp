import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Button, Checkbox, Image, Typography, Card, Progress } from "antd";
import { saveAnswer } from "../reducer/questionSlice";
import { OPTIONONE, OPTIONTWO } from "../utils/model";
import { useState } from "react";
import { getAllUsers, setUser } from "../reducer/userSlice";

export const DetailQuestionPage = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const questions = useAppSelector((state) => state.question.questionList);
  const questionDetail = questions.find((x) => x.id === questionId);
  const user = useAppSelector((state) => state.user.authedUser);
  const users = useAppSelector((state) => state.user.users);
  const questionOwner = users.find((x) => x.id === questionDetail?.author);

  const dispatch = useAppDispatch();

  if (!questionDetail || !questionOwner) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography.Title>404 Not Found</Typography.Title>
        <Typography.Paragraph>The question you are looking for does not exist.</Typography.Paragraph>
      </div>
    );
  }

  const onChooseOption = (option: string) => {
    dispatch(saveAnswer({ userId: user!.id, questionId: questionDetail.id, answer: option }));
    dispatch(getAllUsers());
    dispatch(setUser(users.find((x) => x.id === user?.id)));
    setSelectedOption(option);
  };

  const numberOptionOne = questionDetail.optionOne.votes.length;
  const numberOptionTwo = questionDetail.optionTwo.votes.length;
  const totalVotes = numberOptionOne + numberOptionTwo;
  const isOptionOneChosen = user?.answers[questionDetail.id] === OPTIONONE;
  const isOptionTwoChosen = user?.answers[questionDetail.id] === OPTIONTWO;

  const isAnswered = !!selectedOption || !!user?.answers[questionDetail.id];

  return (
    <Card
      title={`${questionOwner.name} asks:`}
      style={{
        maxWidth: 600,
        margin: "20px auto",
        padding: "20px",
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Image
          src={questionOwner.avatarURL || undefined}
          width={64}
          style={{ borderRadius: "50%", marginRight: "20px" }}
        />
        <Typography.Title level={4} style={{ margin: 0 }}>
          Would you rather...
        </Typography.Title>
      </div>

      <Button
        block
        onClick={() => onChooseOption(OPTIONONE)}
        disabled={isAnswered}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          padding: "12px 16px",
          borderRadius: 8,
          borderColor: "#d9d9d9",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Checkbox checked={isOptionOneChosen || selectedOption === OPTIONONE} disabled />
        <span style={{ flex: 1, textAlign: "left", marginLeft: "8px" }}>
          {questionDetail.optionOne.text}
        </span>
      </Button>

      {isAnswered && (
        <div style={{ marginBottom: "20px" }}>
          <Progress
            percent={(numberOptionOne / totalVotes) * 100}
            showInfo={false}
            strokeColor="#1890ff"
            style={{ marginBottom: "5px" }}
          />
          <Typography.Text style={{ display: "block", textAlign: "center" }}>
            {numberOptionOne} out of {totalVotes} people chose this option.
          </Typography.Text>
        </div>
      )}

      <Button
        block
        onClick={() => onChooseOption(OPTIONTWO)}
        disabled={isAnswered}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          borderRadius: 8,
          borderColor: "#d9d9d9",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Checkbox checked={isOptionTwoChosen || selectedOption === OPTIONTWO} disabled />
        <span style={{ flex: 1, textAlign: "left", marginLeft: "8px" }}>
          {questionDetail.optionTwo.text}
        </span>
      </Button>

      {isAnswered && (
        <div>
          <Progress
            percent={(numberOptionTwo / totalVotes) * 100}
            showInfo={false}
            strokeColor="#1890ff"
            style={{ marginBottom: "5px" }}
          />
          <Typography.Text style={{ display: "block", textAlign: "center" }}>
            {numberOptionTwo} out of {totalVotes} people chose this option.
          </Typography.Text>
        </div>
      )}
    </Card>
  );
};
