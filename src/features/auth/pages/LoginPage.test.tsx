import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './LoginPage';

function renderWithRouter() {
  const router = createMemoryRouter(
    [
      { path: '/login', element: <LoginPage /> },
      { path: '/dashboard', element: <main>Dashboard Page</main> },
    ],
    { initialEntries: ['/login'] },
  );

  render(<RouterProvider router={router} />);
}

describe('LoginPage', () => {
  it('shows validation error for empty email on blur', () => {
    renderWithRouter();
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.blur(emailInput);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('navigates to dashboard on valid submit', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'LOG IN' }));

    expect(await screen.findByText('Dashboard Page')).toBeInTheDocument();
  });
});
