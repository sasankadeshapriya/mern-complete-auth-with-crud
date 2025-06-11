import { motion as Motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#101010] to-gray-950 flex items-center justify-center relative overflow-hidden'>
      <Motion.div
        className='w-16 h-16 border-4 border-t-4 border-t-[#2192E2] border-[#2A5E75] rounded-full'
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;