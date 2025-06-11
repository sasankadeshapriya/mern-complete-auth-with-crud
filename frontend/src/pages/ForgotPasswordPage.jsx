import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
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
              Forgot Password
            </h2>
            <p className="text-gray-400 text-sm">We'll help you get back in</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-gray-300 text-center text-sm mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </div>
              </Motion.button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <Motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-gradient-to-r from-[#2192E2] to-[#2A5E75] rounded-full flex items-center justify-center mx-auto"
              >
                <Mail className="h-8 w-8 text-white" />
              </Motion.div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Check Your Email</h3>
                <p className="text-gray-300 text-sm">
                  If an account exists for {email}, you will receive a password reset link shortly.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[#2A5E75]/50 text-center">
            <Link to="/login" className="text-[#2192E2] hover:text-[#2A5E75] text-sm font-semibold transition-colors duration-200 flex items-center justify-center">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
            </Link>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2192E2] via-[#2A5E75] to-[#2192E2]" />
      </Motion.div>
    </div>
  );
};

export default ForgotPasswordPage;