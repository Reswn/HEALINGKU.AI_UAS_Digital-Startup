import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ id, image, title, location }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden p-4 cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => navigate(`/DestinationDetail/${id}`)}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-md"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
  );
};

DestinationCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string,
};

export default DestinationCard;
