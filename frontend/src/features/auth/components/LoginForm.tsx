import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginCredentials } from '../api';
import { useLogin } from '../hooks';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });
  
  const loginMutation = useLogin();

  const onSubmit = (data: LoginCredentials) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email address"
        type="email"
        placeholder="you@company.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        {...register('password')}
        error={errors.password?.message}
      />
      <Button 
        type="submit" 
        className="w-full" 
        isLoading={loginMutation.isPending}
      >
        Sign In
      </Button>
    </form>
  );
};
