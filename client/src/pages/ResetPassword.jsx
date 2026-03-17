import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await updatePassword(newPassword);

    if (result.error) {
      const errorMessage = result.error.message?.toLowerCase() || '';
      if (errorMessage.includes('same password') || errorMessage.includes('same_password')) {
        setError('New password must be different from your current password.');
      } else if (result.error.status === 401 || errorMessage.includes('session')) {
        setError('Your reset link has expired. Please request a new one from the login page.');
      } else {
        setError(result.error.message || 'Failed to update password. Please try again.');
      }
    } else {
      setSuccessMessage('Password updated successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2000);
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
              Set New Password
            </h1>
            <p className="text-ossium-muted">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-4 mb-6">
            {successMessage && (
              <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-3 rounded-lg text-sm text-center">
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
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-ossium-muted focus:outline-none focus:border-ossium-accent focus:ring-1 focus:ring-ossium-accent transition-all"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-ossium-muted focus:outline-none focus:border-ossium-accent focus:ring-1 focus:ring-ossium-accent transition-all"
              />
            </div>

            {/* Password strength indicator */}
            {newPassword.length > 0 && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  <div className={`h-1 flex-1 rounded-full transition-all ${newPassword.length >= 6 ? 'bg-red-400' : 'bg-white/10'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-all ${newPassword.length >= 8 ? 'bg-yellow-400' : 'bg-white/10'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-all ${newPassword.length >= 10 && /[!@#$%^&*]/.test(newPassword) ? 'bg-emerald-400' : 'bg-white/10'}`} />
                </div>
                <p className="text-[10px] text-ossium-muted">
                  {newPassword.length < 6 ? 'Too short — minimum 6 characters' :
                   newPassword.length < 8 ? 'Weak — try adding more characters' :
                   newPassword.length < 10 || !/[!@#$%^&*]/.test(newPassword) ? 'Good — add special characters for stronger security' :
                   'Strong password ✓'}
                </p>
              </div>
            )}

            {/* Match indicator */}
            {confirmPassword.length > 0 && (
              <p className={`text-[11px] ${newPassword === confirmPassword ? 'text-emerald-400' : 'text-red-400'}`}>
                {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}
              className="w-full bg-ossium-accent text-ossium-darker font-bold py-3 px-4 rounded-xl hover:bg-ossium-accent-hover transition-all duration-300 shadow-[0_4px_20px_rgba(202,255,51,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-ossium-muted hover:text-white transition-colors underline decoration-dotted underline-offset-4"
              >
                ← Back to Log In
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center px-4">
            <p className="text-[10px] text-ossium-muted leading-relaxed">
              If you didn't request a password reset, you can safely ignore this.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;
