import React from 'react';
import { render } from '@testing-library/react';
import { QuestionItem } from "../features/components/QuestionItem";
import { BrowserRouter } from 'react-router-dom';

/**
 * @jest-environment jsdom
 */

const mockQuestion = {
  id: '8xf0y6ziyjabvozdd253nd',
  author: 'sarahedo',
  optionOne: {
    votes: ['sarahedo'],
    text: 'Build our new application with Javascript',
  },
  optionTwo: {
    votes: [],
    text: 'Build our new application with Typescript',
  },
  timestamp: 1
};

describe('QuestionItem', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <QuestionItem question={mockQuestion} />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
