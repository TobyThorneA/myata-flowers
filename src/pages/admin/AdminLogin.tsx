// src/pages/admin/AdminLogin.tsx
// форма логина

// src/pages/AdminLogin.tsx
import { useAppDispatch } from "@store/app/hook";
import { loginSuccess } from "@store/slices/authSlice";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post<{ token: string }>(
        "https://api-v2.myata-flowers.ru/admin/login",
        { email, password },
      );

      dispatch(loginSuccess(response.data.token));
      navigate("/admin/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || "Ошибка авторизации");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold">Вход администратора</h2>

        {error && <p className="mb-2 text-center text-sm text-red-600">{error}</p>}

        <label className="mb-1 block text-sm text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring"
        />

        <label className="mb-1 block text-sm text-gray-700" htmlFor="password">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring"
        />

        <button
          type="submit"
          className="w-full rounded bg-black py-2 text-white transition hover:bg-gray-800"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
