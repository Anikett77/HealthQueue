const Card = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

