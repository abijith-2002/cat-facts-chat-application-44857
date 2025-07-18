import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cat facts chat header', () => {
  render(<App />);
  const headerElement = screen.getByText(/cat facts chat/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders initial bot message', () => {
  render(<App />);
  expect(
    screen.getByText(/fun cat fact every time you send a message/i)
  ).toBeInTheDocument();
});
