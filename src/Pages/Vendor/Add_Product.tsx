import React from "react";

const Add_Product = () => {
  return (
    <div>
      <h1>Add Product</h1>
      <form>
        <label>Product Name</label>
        <input type="text" name="product_name" required />
        <label>Product Description</label>
        <input type="text" name="product_description" required />
        <label>Product Price</label>
        <input type="text" name="product_price" required />
        <label>Product Quantity</label>
        <input type="text" name="product_quantity" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Add_Product;
