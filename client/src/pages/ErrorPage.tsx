import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>

      <p className="text-gray-500 mb-4">
        {error?.message || "Unexpected error occurred"}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Retry
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 border rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
