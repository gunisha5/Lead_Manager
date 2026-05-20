import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterCredentials } from '../api';
import { useRegister } from '../hooks';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
  });
  
  const registerMutation = useRegister();

  const onSubmit = (data: RegisterCredentials) => {
    registerMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        {...register('name')}
        error={errors.name?.message}
      />
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
        isLoading={registerMutation.isPending}
      >
        Create Account
      </Button>
    </form>
  );
};
