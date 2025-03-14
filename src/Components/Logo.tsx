import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-3xl  text-white">
      <h2 className="text-[#555555] font-extrabold">
        <NavLink to="/">Find My Venue</NavLink>
      </h2>
    </div>
  );
};

export default Logo;
