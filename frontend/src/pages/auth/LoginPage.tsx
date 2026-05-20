import { LoginForm } from '@/features/auth/components/LoginForm';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { useAuth } from '@/features/auth/AuthContext';
import { Navigate } from 'react-router-dom';

export const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <AuthLayout
      title="Smart Leads Dashboard"
      subtitle="Sign in to your account"
      alternativeAction={{
        text: "Don't have an account?",
        linkText: "Sign up",
        to: "/register"
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
};
