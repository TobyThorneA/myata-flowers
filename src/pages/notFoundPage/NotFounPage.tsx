// pages/NotFoundPage.tsx
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <Helmet>
        <title>404 — Страница не найдена</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="mb-4 text-5xl font-bold text-red-600">404</h1>
      <p className="mb-4 text-xl">Страница не найдена 😢</p>
      <Link to="/" className="text-blue-600 underline hover:text-blue-800">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
