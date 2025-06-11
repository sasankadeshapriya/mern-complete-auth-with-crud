import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock, Loader } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully, redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <div className="relative max-w-md w-full mx-auto">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-[#2192E2] rounded-full animate-pulse opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#101010]/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-[#2A5E75]/50"
      >
        {/* Neon glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2192E2]/10 via-transparent to-[#2A5E75]/10 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2192E2]/5 to-transparent rounded-2xl animate-pulse" />
        
        {/* Card content */}
        <div className="relative z-10 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2192E2] to-[#2A5E75] bg-clip-text text-transparent mb-2">
              Reset Password
            </h2>
            <p className="text-gray-400 text-sm">Enter your new password below</p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg mb-6">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}
          
          {message && (
            <div className="p-3 bg-[#2192E2]/10 border border-[#2192E2]/50 rounded-lg mb-6">
              <p className="text-[#2192E2] text-sm text-center">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              icon={Lock}
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`relative w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-[#2192E2]/50 ${
                isLoading 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#2192E2] to-[#2A5E75] hover:from-[#2A5E75] hover:to-[#2192E2] shadow-lg hover:shadow-[#2192E2]/25'
              }`}
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2192E2] to-[#2A5E75] rounded-lg blur opacity-0 hover:opacity-30 transition-opacity duration-300" />
              
              <div className="relative flex items-center justify-center">
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Resetting...
                  </>
                ) : (
                  'Set New Password'
                )}
              </div>
            </Motion.button>
          </form>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2192E2] via-[#2A5E75] to-[#2192E2]" />
      </Motion.div>
    </div>
  );
};

export default ResetPasswordPage;