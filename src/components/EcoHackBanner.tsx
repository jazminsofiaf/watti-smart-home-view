
import { useNavigate } from "react-router-dom";

const EcoHackBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navegando a eco-hacks");
    navigate('/eco-hacks');
  };

  return (
    <div 
      className="bg-sage-green rounded-lg p-3 sm:p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow hover:scale-[1.02] transition-transform"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="bg-midnight-teal rounded-full p-1.5 sm:p-2">
          <span className="text-ivory-mist text-xs sm:text-sm font-bold">💡</span>
        </div>
        <div>
          <h4 className="text-midnight-teal font-semibold text-xs sm:text-sm mb-1">Eco-hack del día</h4>
          <p className="text-midnight-teal text-xs sm:text-sm">
            Cerrá la puerta del pasillo al encender el aire para ahorrar 12%
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcoHackBanner;
