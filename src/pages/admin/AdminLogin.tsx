// src/pages/admin/AdminLogin.tsx
// форма логина

// src/pages/AdminLogin.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/app/hook';
import { loginSuccess } from '@store/slices/authSlice';

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post<{ token: string }>(
        'https://api-v2.myata-flowers.ru/admin/login',
        { email, password }
      );

      dispatch(loginSuccess(response.data.token));
      navigate('/admin/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Ошибка авторизации');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Вход администратора</h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-2">{error}</p>
        )}

        <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring"
        />

        <label className="block text-gray-700 text-sm mb-1" htmlFor="password">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
