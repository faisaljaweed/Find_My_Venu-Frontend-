import { useEffect, useState } from "react";
import {
  DeleteProduct,
  getAllProducts,
} from "../../Components/api/Product_Api";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  pics: string[];
}

const Check_Product_details = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res?.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id: string) => {
    DeleteProduct(id)
      .then((res) => {
        console.log(res);
        setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(`Deleting product with ID: ${id}`);
    // Yahan API call laga sakte hain
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Check Product Details
      </h1>
      <Grid container spacing={3} className="w-full max-w-5xl">
        {products.map((product: any) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card className="shadow-md rounded-lg overflow-hidden">
              {/* Image Slider agar 2 ya zyada images hain */}
              {product.pics.length > 1 ? (
                <Slider {...sliderSettings}>
                  {product.pics.map((img: string, index: number) => (
                    <div key={index}>
                      <img
                        src={img}
                        alt={`Product ${index}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                // Agar sirf ek image ho to simple image show kare
                <img
                  src={product.pics[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <CardContent>
                <Typography variant="h6" className="font-bold text-gray-800">
                  {product.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {product.description}
                </Typography>
                <Typography variant="h6" className="text-blue-600 mt-2">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(product._id)}
                  className="mt-4"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Check_Product_details;
