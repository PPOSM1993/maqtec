import ProtectedRoute from "../../routes/ProtectedRoute";
import Clients from "./components/Clients";


export default function ClientsPage() {
    return (
        <>
            <ProtectedRoute>
                <Clients />
            </ProtectedRoute>
        </>
    );
}