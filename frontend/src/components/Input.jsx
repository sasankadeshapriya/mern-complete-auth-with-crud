import React, { useState } from 'react';

const Input = ({ icon: Icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6">
      <div className={`relative group ${isFocused ? 'scale-[1.02]' : ''} transition-all duration-300`}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2192E2]/20 to-[#2A5E75]/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center">
          {Icon && (
            <Icon className={`absolute left-4 z-10 w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-[#2192E2]' : 'text-gray-400'
            }`} />
          )}
          <input
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
            className={`w-full py-4 ${Icon ? 'pl-12' : 'pl-4'} pr-4 bg-[#101010]/80 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
              isFocused 
                ? 'border-[#2192E2] shadow-lg shadow-[#2192E2]/25' 
                : 'border-[#2A5E75]/30 hover:border-[#2A5E75]/50'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;