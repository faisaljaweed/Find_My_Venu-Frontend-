const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-left">
          <h2 className="text-2xl font-bold">FindMyVenue</h2>
        </div>
        <div className="text-right">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FindMyVenue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
