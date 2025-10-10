import LoginForm from "../../components/LoginForm";
import PublicRoute from "../../routes/ProtectedRoute";

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  );
}
