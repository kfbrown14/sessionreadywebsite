import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';  
import { zodResolver } from '@hookform/resolvers/zod';  
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Button from '../../components/common/Button';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login data:', data);
      // TODO: Implement actual login logic
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-mist">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              className="bg-white rounded-2xl shadow-medium p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2 text-primary-dark mb-4">
                  <img 
                    src="/session-ready-logo.png" 
                    alt="Session Ready Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-secondary text-2xl font-bold">Session Ready</span>
                </Link>
                <h1 className="font-nunito text-2xl font-bold mb-2">Welcome Back</h1>
                <p className="text-earth">Continue your growth journey</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-earth-dark mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="w-full px-4 py-2 rounded-lg border border-sage-light/30 focus:outline-none focus:ring-2 focus:ring-sage/50"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-earth-dark mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      {...register('password')}
                      className="w-full px-4 py-2 rounded-lg border border-sage-light/30 focus:outline-none focus:ring-2 focus:ring-sage/50"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-dark/50 hover:text-earth-dark"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      {...register('rememberMe')}
                      className="h-4 w-4 rounded border-sage-light/30 text-sage focus:ring-sage/50"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-earth-dark">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-sage hover:text-sage-dark">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-earth">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-sage hover:text-sage-dark font-semibold">
                    Sign up
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;