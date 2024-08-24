import { Button, Input, Typography, message } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllQuestions, saveQuestion } from "../reducer/questionSlice";
import { useNavigate } from "react-router-dom";

export const CreateQuestionPage = () => {
  const navigate = useNavigate();
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.authedUser);

  const onSubmit = () => {
    if (!option1.trim() || !option2.trim()) {
      message.error("Both options are required!");
      return;
    }
    dispatch(saveQuestion({ optionOneText: option1, optionTwoText: option2, author: user!.id }));
    dispatch(getAllQuestions())
    setOption1("");
    setOption2("");
    message.success("Question created successfully!");
    navigate("/home")
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <Typography.Title level={3}>Create a New Question</Typography.Title>
      <Typography.Paragraph>Would you rather...</Typography.Paragraph>
      <Input
        placeholder="Enter Option One"
        value={option1}
        onChange={(e) => setOption1(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Enter Option Two"
        value={option2}
        onChange={(e) => setOption2(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button type="primary" onClick={onSubmit} block>
        Submit Question
      </Button>
    </div>
  );
};
