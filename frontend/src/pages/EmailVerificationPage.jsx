import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      const verificationCode = code.join("");
      try {
        await verifyEmail(verificationCode);
        navigate("/");
        toast.success("Email verified successfully");
      } catch (error) {
        console.log(error);
      }
    },
    [code, verifyEmail, navigate]
  );

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code, handleSubmit]);

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
              Verify Your Email
            </h2>
            <p className="text-gray-400 text-sm">Enter the 6-digit code sent to your email address</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-[#101010]/80 text-white border-2 border-[#2A5E75]/30 rounded-lg focus:border-[#2192E2] focus:outline-none focus:ring-2 focus:ring-[#2192E2]/25 transition-all duration-300"
                />
              ))}
            </div>
            
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}
            
            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || code.some((digit) => !digit)}
              className={`relative w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-[#2192E2]/50 ${
                isLoading || code.some((digit) => !digit)
                  ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                  : 'bg-gradient-to-r from-[#2192E2] to-[#2A5E75] hover:from-[#2A5E75] hover:to-[#2192E2] shadow-lg hover:shadow-[#2192E2]/25'
              }`}
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2192E2] to-[#2A5E75] rounded-lg blur opacity-0 hover:opacity-30 transition-opacity duration-300" />
              
              <div className="relative flex items-center justify-center">
                {isLoading ? "Verifying..." : "Verify Email"}
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

export default EmailVerificationPage;