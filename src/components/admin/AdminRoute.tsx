import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { ReactNode } from 'react';
import { ShieldAlert, Loader2 } from 'lucide-react';

const AdminRoute = ({ children }: { children: ReactNode }) => {
    const { isAdmin, loading } = useAdminAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
        );
    }

    if (!isAdmin) return <Navigate to="/admin/login" replace />;
    return <>{children}</>;
};

export default AdminRoute;
