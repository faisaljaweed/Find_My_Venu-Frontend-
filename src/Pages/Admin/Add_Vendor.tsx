export const Add_Vendor = () => {
  return (
    <>
      <h1>Add Vendor</h1>
      <form>
        <label>Vendor Name</label>
        <input type="text" name="vendor_name" required />
        <label>Vendor Email</label>
        <input type="email" name="vendor_email" required />
        <label>Vendor Phone</label>
        <input type="text" name="vendor_phone" required />
        <label>Vendor Address</label>
        <input type="text" name="vendor_address" required />
        <button type="submit">Add Vendor</button>
      </form>
    </>
  );
};
