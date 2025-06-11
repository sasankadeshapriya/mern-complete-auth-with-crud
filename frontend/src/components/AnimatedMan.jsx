import React, { useEffect, useState } from 'react';

const AnimatedAlien = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.querySelector('.alien-container')?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / 10;
        const deltaY = (e.clientY - centerY) / 10;
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="alien-container absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-20">
      {/* Glowing border circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2192E2] via-[#2A5E75] to-[#2192E2] p-1 animate-pulse">
        <div className="w-full h-full rounded-full bg-[#101010]/90 backdrop-blur-sm overflow-hidden">
          {/* Alien character */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2192E2]/30 to-[#2A5E75]/30 rounded-full blur-sm" />
            
            {/* Alien head */}
            <div className="relative z-10 transform scale-75">
              {/* Head shape */}
              <div className="w-20 h-24 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full relative shadow-2xl">
                {/* Head glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2192E2]/40 to-[#2A5E75]/40 rounded-full" />
                
                {/* Eyes container */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {/* Left eye */}
                  <div className="relative">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <div 
                        className="w-3 h-3 bg-gradient-to-br from-[#2192E2] to-[#2A5E75] rounded-full transition-transform duration-100 ease-out shadow-lg"
                        style={{
                          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
                        }}
                      >
                        <div className="w-1 h-1 bg-white rounded-full ml-0.5 mt-0.5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Right eye */}
                  <div className="relative">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <div 
                        className="w-3 h-3 bg-gradient-to-br from-[#2192E2] to-[#2A5E75] rounded-full transition-transform duration-100 ease-out shadow-lg"
                        style={{
                          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
                        }}
                      >
                        <div className="w-1 h-1 bg-white rounded-full ml-0.5 mt-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Nose/mouth area */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-2 bg-gray-600 rounded-full" />
                </div>
                
                {/* Antennae */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <div className="w-0.5 h-4 bg-gradient-to-t from-gray-300 to-[#2192E2] rounded-full">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#2192E2] rounded-full animate-pulse" />
                  </div>
                  <div className="w-0.5 h-4 bg-gradient-to-t from-gray-300 to-[#2192E2] rounded-full">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#2192E2] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional glow effects */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2192E2]/20 to-[#2A5E75]/20 blur-xl animate-pulse" />
    </div>
  );
};

export default AnimatedAlien;