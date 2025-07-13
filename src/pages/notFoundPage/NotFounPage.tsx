// pages/NotFoundPage.tsx
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <Helmet>
        <title>404 — Страница не найдена</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-4">Страница не найдена 😢</p>
      <Link to="/" className="text-blue-600 underline hover:text-blue-800">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;