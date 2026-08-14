import { render, screen } from '@testing-library/react';
import App from './App';

test('renders JobCentral brand in App', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/JobCentral/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
