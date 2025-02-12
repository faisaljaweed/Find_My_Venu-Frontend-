import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import { Vendor_Bookig_add_api } from "../../Components/api/Booking_Api";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

const Add_Booking = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // First dropdown (category)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Products filtered by category
  const [selectedProduct, setSelectedProduct] = useState<string>(""); // Second dropdown (product)
  const [bookingDate, setBookingDate] = useState<string>(""); // Booking date

  // Fetch all products when the component mounts
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        // Adjust based on your API response structure
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter products whenever the selected category changes
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.type === selectedCategory
      );
      setFilteredProducts(filtered);
    }
    // Clear any previously selected product
    setSelectedProduct("");
  }, [selectedCategory, products]);

  // Handlers for input changes
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookingDate(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!bookingDate || !selectedProduct) {
      console.log("Please select both a product and a booking date.");
      return;
    }

    // Convert date to ISO string (if your API requires it)
    const isoBookingDate = new Date(bookingDate).toISOString();

    try {
      const res = await Vendor_Bookig_add_api(isoBookingDate, selectedProduct);
      console.log("Booking response:", res);
      // Optionally, add logic here to show a success message or clear the form
    } catch (err) {
      console.log("Error during booking:", err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 3,
        mt: 5,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Add Booking
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Category Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="farm house">Farm House</MenuItem>
            <MenuItem value="hall">Hall</MenuItem>
            <MenuItem value="villas">Villas</MenuItem>
            <MenuItem value="banquet">Banquet</MenuItem>
            <MenuItem value="murquee">Murquee</MenuItem>
          </Select>
        </FormControl>

        {/* Product Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="product-label">Product</InputLabel>
          <Select
            labelId="product-label"
            value={selectedProduct}
            label="Product"
            onChange={(event: SelectChangeEvent<string>) => {
              setSelectedProduct(event.target.value as string);
            }}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {filteredProducts.map((product) => (
              <MenuItem key={product._id} value={product._id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Booking Date */}
        <TextField
          fullWidth
          margin="normal"
          label="Booking Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={bookingDate}
          onChange={handleDateChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Booking
        </Button>
      </form>
    </Box>
  );
};

export default Add_Booking;
