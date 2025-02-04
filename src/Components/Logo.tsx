import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-3xl font-bold">
      <h2 className="text-white">
        <NavLink to="/">Find My Venue</NavLink>
      </h2>
    </div>
  );
};

export default Logo;
