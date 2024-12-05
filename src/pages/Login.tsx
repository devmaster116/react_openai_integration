import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BackgroundImage, { BackgroundImage as BackgroundImageType } from '../components/login/BackgroundImage';
import LoginForm from '../components/login/LoginForm';
import ComplianceMessage from '../components/ComplianceMessage';

const backgroundImages: BackgroundImageType[] = [
  {
    url: "https://images.unsplash.com/photo-1585108718982-205ee2ee0c1a",
    description: "Ancient Islamic calligraphy and architectural details"
  },
  {
    url: "https://images.unsplash.com/photo-1604697976842-c26e7a77a39c",
    description: "Children learning in a traditional tent school"
  },
  {
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    description: "Stunning night sky filled with stars"
  },
  {
    url: "https://images.unsplash.com/photo-1544352453-7c51f578c7aa",
    description: "Vibrant coral reef ecosystem underwater"
  },
  {
    url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e",
    description: "Ancient pyramids at sunset showcasing human architectural achievement"
  }
];

export default function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedImage] = useState(backgroundImages[Math.floor(Math.random() * backgroundImages.length)]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = () => {
    navigate('/zadigpt');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundImage image={selectedImage} />
      
      <div className="relative z-10 min-h-screen flex">
        {/* Login Form */}
        <div className={`w-5/12 transition-transform duration-500 ease-in-out transform ${
          showLogin ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {showLogin && (
            <LoginForm onSuccess={handleLoginSuccess} />
          )}
        </div>

        {/* Logo and Motto */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Compass className="w-32 h-32 text-white mb-6 animate-pulse mx-auto" />
            <h1 className="text-5xl font-bold text-white mb-3">
              <span className="text-white">H</span>I Z<span className="text-blue-500">A</span>D<span className="text-blue-500">I</span>!
            </h1>
            <p className="text-2xl text-white font-bold mb-8">
              Generative <span className="text-blue-500">H</span>uman <span className="text-blue-500">I</span>ntelligence
            </p>
            {!showLogin && (
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
              >
                Click2Learn+
              </button>
            )}
          </div>
        </div>
      </div>

      <ComplianceMessage />
    </div>
  );
}