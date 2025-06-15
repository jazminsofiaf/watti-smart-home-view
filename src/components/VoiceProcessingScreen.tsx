
import VoiceflowWidget from './VoiceflowWidget'

interface VoiceProcessingScreenProps {
  onClose: () => void;
}

const VoiceProcessingScreen = ({ onClose }: VoiceProcessingScreenProps) => {
  return (
    <div className="p-10">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-dusty-cyan hover:text-midnight-teal"
      >
        ✕
      </button>

      <div>
        <VoiceflowWidget />
      </div>
    </div>
  );
};

export default VoiceProcessingScreen;
