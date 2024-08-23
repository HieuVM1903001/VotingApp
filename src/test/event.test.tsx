import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { saveQuestion, getAllQuestions } from '../reducer/questionSlice';
import { message } from 'antd';
import { CreateQuestionPage } from '../page/CreateQuestionPage';

// Mock hooks and Ant Design message component
jest.mock('../app/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../reducer/questionSlice', () => ({
  saveQuestion: jest.fn(),
  getAllQuestions: jest.fn(),
}));

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('CreateQuestionPage Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({ id: 'sarahedo' });
  });

  test('should display error message if either option is empty', () => {
    render(<CreateQuestionPage />);

    fireEvent.click(screen.getByText('Submit Question'));

    expect(message.error).toHaveBeenCalledWith('Both options are required!');
  });

  test('should dispatch saveQuestion and getAllQuestions on submit', () => {
    render(<CreateQuestionPage />);

    fireEvent.change(screen.getByPlaceholderText('Enter Option One'), {
      target: { value: 'Option 1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Option Two'), {
      target: { value: 'Option 2' },
    });

    fireEvent.click(screen.getByText('Submit Question'));

    expect(mockDispatch).toHaveBeenCalledWith(
      saveQuestion({
        optionOneText: 'Option 1',
        optionTwoText: 'Option 2',
        author: 'sarahedo',
      })
    );

    expect(mockDispatch).toHaveBeenCalledWith(getAllQuestions());

    expect(message.success).toHaveBeenCalledWith('Question created successfully!');
  });

  test('should clear input fields after successful submission', () => {
    render(<CreateQuestionPage />);

    const input1 = screen.getByPlaceholderText('Enter Option One');
    const input2 = screen.getByPlaceholderText('Enter Option Two');

    fireEvent.change(input1, {
      target: { value: 'Option 1' },
    });
    fireEvent.change(input2, {
      target: { value: 'Option 2' },
    });

    fireEvent.click(screen.getByText('Submit Question'));

    expect(input1).toHaveValue('');
    expect(input2).toHaveValue('');
  });
});
