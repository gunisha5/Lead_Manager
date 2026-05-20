import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { useAuth } from '@/features/auth/AuthContext';
import { Navigate } from 'react-router-dom';

export const RegisterPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <AuthLayout
      title="Smart Leads Dashboard"
      subtitle="Create your account"
      alternativeAction={{
        text: "Already have an account?",
        linkText: "Sign in",
        to: "/login"
      }}
    >
      <RegisterForm />
    </AuthLayout>
  );
};
