import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizPage from './page'; // Adjust path if needed
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation'; // Keep this import
import QuizCreation from '@/components/QuizCreation';

// --- The Definitive Mocking Solution ---

// 1. Mock the entire 'next/navigation' module
jest.mock('next/navigation', () => ({
  // Use requireActual to preserve other exports from the module
  ...jest.requireActual('next/navigation'),
  // Replace the 'redirect' export with a mock function
  redirect: jest.fn(),
}));

// 2. Mock your other dependencies as usual
jest.mock('@/lib/nextauth');
jest.mock('@/components/QuizCreation', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="quiz-creation" />),
}));

// --- Type-safe Mocks ---
// This cast now works because the module's 'redirect' has been replaced by jest.fn()
const mockedGetAuthSession = getAuthSession as jest.Mock;
const mockedRedirect = redirect as jest.Mock;
const mockedQuizCreation = QuizCreation as jest.Mock;

// --- Test Suite ---
describe('QuizPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to home ("/") if the user is not authenticated', async () => {
    // Arrange
    mockedGetAuthSession.mockResolvedValue(null);
    const props = { searchParams: {} };

    // Act
    render(await QuizPage(props));

    // Assert
    expect(mockedRedirect).toHaveBeenCalledWith('/');
    expect(mockedRedirect).toHaveBeenCalledTimes(1);
  });

  it('should render QuizCreation and pass the correct topic prop', async () => {
    // Arrange
    const mockSession = { user: { id: 'user-123' } };
    mockedGetAuthSession.mockResolvedValue(mockSession);
    const props = { searchParams: { topic: 'science' } };

    // Act
    render(await QuizPage(props));

    // Assert
    expect(screen.getByTestId('quiz-creation')).toBeInTheDocument();
    expect(mockedQuizCreation).toHaveBeenCalledWith({ topicParams: 'science' }, {});
    expect(mockedRedirect).not.toHaveBeenCalled();
  });
});