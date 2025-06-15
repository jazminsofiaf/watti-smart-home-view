
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VoiceProcessingScreen from '@/components/VoiceProcessingScreen';

const AgentPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-ivory-mist">
      {/* Go back arrow */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <ArrowLeft className="w-6 h-6 text-dusty-cyan" />
      </button>

      {/* Voice processing screen */}
      <VoiceProcessingScreen onClose={handleGoBack} />
    </div>
  );
};

export default AgentPage;
