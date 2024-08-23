import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Question, QuestionCreateModel, UserAnswer } from "../utils/model";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";

interface QuestionState {
  questionList: Question[];
  userQuestions: Question[];
}
const initialState: QuestionState = {
  questionList: [],
  userQuestions: [],
};
export const getAllQuestions = createAsyncThunk("question/fetch", async () => {
  const question = await _getQuestions();
  return Object.values(question) as Question[];
});
export const saveQuestion = createAsyncThunk(
  "question/save",
  async (question: QuestionCreateModel) => {
    return await _saveQuestion(question);
  }
);
export const saveAnswer = createAsyncThunk(
  "question/answer",
  async (userAnswer: UserAnswer) => {
    return await _saveQuestionAnswer({
      authedUser: userAnswer.userId,
      qid: userAnswer.questionId,
      answer: userAnswer.answer,
    });
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllQuestions.fulfilled, (state, action) => {
      state.questionList = action.payload;
    });
  },
});

export default questionSlice.reducer;
