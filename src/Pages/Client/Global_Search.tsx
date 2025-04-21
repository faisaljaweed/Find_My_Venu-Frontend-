// pages/GlobalSearchPage.tsx
import { useLocation } from "react-router-dom";
import FIltered_Card from "./FIltered_Card";
import { Product } from "../../Components/Types/Product_types";

const GlobalSearchPage = () => {
  const location = useLocation();
  const state = location.state as {
    filteredProducts: Product[];
    hasSearched: boolean;
  };

  return (
    <div className="p-6">
      <FIltered_Card
        filteredProducts={state?.filteredProducts || []}
        hasSearched={state?.hasSearched || false}
      />
    </div>
  );
};

export default GlobalSearchPage;
