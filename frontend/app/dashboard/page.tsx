import ProtectedRoute from "../../routes/ProtectedRoute";
import Dashboard from "./components/Dashboard";


export default function DashboardPage() {
    return (
        <>
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        </>
    );
}