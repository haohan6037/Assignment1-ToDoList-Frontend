import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../components/Register';
import Home from '../components/Home';
import { MemoryRouter } from 'react-router-dom';

test('user can input username and email and password', () => {
   <MemoryRouter>
      <Register />
       <Home />
    </MemoryRouter>

  const usernameInput = screen.getByLabelText(/username/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const registerButton = screen.getByText(/register/i);

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  expect(usernameInput.value).toBe('testuser');
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('123456');
  expect(registerButton).toBeInTheDocument();
});