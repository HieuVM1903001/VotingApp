import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";

describe("API Functions", () => {
  it("_getUsers should return the users object", async () => {
    const users = await _getUsers();
    expect(users).toHaveProperty("sarahedo");

    expect(users.sarahedo.name).toBe("Sarah Edo");
  });

  it("_getQuestions should return the questions object", async () => {
    const questions = await _getQuestions();
    expect(questions).toHaveProperty("8xf0y6ziyjabvozdd253nd");
    expect(questions["8xf0y6ziyjabvozdd253nd"].author).toBe("sarahedo");
  });

  it("_saveQuestion should save a new question and return it", async () => {
    const newQuestion = {
      optionOneText: "Option One Test",
      optionTwoText: "Option Two Test",
      author: "sarahedo",
    };

    const savedQuestion = await _saveQuestion(newQuestion);
    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion.optionOne.text).toBe("Option One Test");
    expect(savedQuestion.optionTwo.text).toBe("Option Two Test");
    expect(savedQuestion.author).toBe("sarahedo");

    const questions = await _getQuestions();
    expect(questions).toHaveProperty(savedQuestion.id);
  });
  it("_saveQuestion should reject if required fields are missing", async () => {
    const invalidQuestion = {
      optionOneText: "Option One Test",
      optionTwoText: "",
      author: "sarahedo",
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
