import { _getUsers, _saveQuestionAnswer } from "../utils/_DATA";

describe("_saveQuestionAnswer", () => {
  it("_saveQuestionAnswer should save the answer and update user and question", async () => {
    const answerData = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    };

    const result = await _saveQuestionAnswer(answerData);
    expect(result).toBe(true);

    const users = await _getUsers();
    expect(users.sarahedo.answers).toHaveProperty("8xf0y6ziyjabvozdd253nd");
    expect(users.sarahedo.answers["8xf0y6ziyjabvozdd253nd"]).toBe("optionTwo");
  });
  it("should reject if authedUser is not provided", async () => {
    await expect(
      _saveQuestionAnswer({ authedUser: "", qid: "123", answer: "optionOne" })
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});
