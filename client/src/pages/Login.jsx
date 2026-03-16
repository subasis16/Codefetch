import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const Login = () => {
  const { user, signInWithGithub, signInWithEmail, signUpWithEmail } = useAuth();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    let result;
    if (isSignUp) {
      result = await signUpWithEmail(email, password);
    } else {
      result = await signInWithEmail(email, password);
    }

    if (result.error) {
      const errorStatus = result.error.status;
      const errorMessage = result.error.message?.toLowerCase() || '';

      if (errorStatus === 429) {
        setError('Too many attempts. Please wait 1-2 minutes before trying again.');
      } else if (errorStatus === 400) {
        if (errorMessage.includes('email') || errorMessage.includes('invalid')) {
          setError('Invalid email address. Please use a real email (not test@test.com).');
        } else if (errorMessage.includes('password')) {
          setError('Password must be at least 6 characters long.');
        } else {
          setError('Invalid request. Please check your email and password.');
        }
      } else if (errorMessage.includes('already registered')) {
        setError('This email is already registered. Try logging in instead.');
      } else if (errorMessage.includes('invalid login')) {
        setError('Incorrect email or password. Please try again.');
      } else {
        setError(result.error.message || 'An error occurred. Please try again.');
      }
    } else {
      // Success!
      if (isSignUp) {
        setSuccessMessage('Account created! Please check your email to confirm your signup.');
        setError(null);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ossium-darker text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-24">
        <div className="w-full max-w-md bg-[#121212] border border-white/5 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-ossium-muted">
              {isSignUp ? 'Enter your details to sign up' : 'Sign in to access your dashboard'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4 mb-6">
            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded-lg text-sm text-center">
                {successMessage}
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-ossium-muted focus:outline-none focus:border-ossium-accent focus:ring-1 focus:ring-ossium-accent transition-all"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-ossium-muted focus:outline-none focus:border-ossium-accent focus:ring-1 focus:ring-ossium-accent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ossium-accent text-ossium-darker font-bold py-3 px-4 rounded-xl hover:bg-ossium-accent-hover transition-all duration-300 shadow-[0_4px_20px_rgba(202,255,51,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="text-sm text-ossium-muted hover:text-white transition-colors underline decoration-dotted underline-offset-4"
              >
                {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-xs text-ossium-muted uppercase font-bold tracking-wider">Or continue with</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={signInWithGithub}
              className="w-full flex items-center justify-center gap-2 bg-[#24292e] hover:bg-[#2f363d] text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 border border-white/5 hover:border-white/20 text-sm"
            >
              <FaGithub size={18} />
              <span>Login to CodeFetch with GitHub</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center px-4">
            <p className="text-[10px] text-ossium-muted leading-relaxed">
              By continuing, you agree to CodeFetch's <Link to="/terms" className="underline hover:text-white">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
