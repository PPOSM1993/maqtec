import LoginForm from "./forms/LoginForm";
import PublicRoute from "../../routes/PublicRoute";


export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  );
}
