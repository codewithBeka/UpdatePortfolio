// Define the prop types for Button
interface ButtonProps {
  name: string;
  isBeam?: boolean; // Optional prop, default is false
  containerClass?: string; // Optional prop
}

const Button: React.FC<ButtonProps> = ({
  name,
  isBeam = false,
  containerClass,
}) => {
  return (
    <button className={`btn ${containerClass}`}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="btn-ping"></span>
          <span className="btn-ping_dot"></span>
        </span>
      )}
      {name}
    </button>
  );
};

export default Button;
