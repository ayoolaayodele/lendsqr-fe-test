import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import LoginPage from './LoginPage';

function renderWithRouter() {
  const router = createMemoryRouter(
    [
      { path: '/login', element: <LoginPage /> },
      { path: '/users', element: <main>Users Page</main> },
    ],
    { initialEntries: ['/login'] },
  );

  render(<RouterProvider router={router} />);
}

describe('LoginPage', () => {
  it('shows validation error for empty email on blur', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    const emailInput = screen.getByPlaceholderText('Email');
    await user.click(emailInput);
    await user.tab();

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    expect(await screen.findByText('Enter a valid email address')).toBeInTheDocument();
  });

  it('disables login button when form is empty', () => {
    renderWithRouter();

    const submitButton = screen.getByRole('button', { name: 'LOG IN' });
    expect(submitButton).toBeDisabled();
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button', { name: 'SHOW' });
    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('navigates to users page on valid submit', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'LOG IN' }));

    expect(await screen.findByText('Users Page')).toBeInTheDocument();
  });
});
