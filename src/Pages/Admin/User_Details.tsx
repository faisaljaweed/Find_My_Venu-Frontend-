// User_Details.tsx
import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DeleteUser, getUser } from "../../Components/api/User_Api";
import { User } from "../../Components/Types/User_types"; // Adjust the path as needed

const User_Details = () => {
  // State variable to hold user data with proper type
  const [userData, setUserData] = useState<User[]>([]);

  // Handler for the "Get User" button click
  const handleGetUser = async () => {
    try {
      const res = await getUser();
      console.log("API Response:", res.data.data);
      // Adjust this according to your API response shape
      setUserData(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("User ID is undefined");
      return;
    }
    try {
      const res = await DeleteUser(id);
      console.log(res);
      // Optionally update the state to remove the deleted user from the UI:
      setUserData((prevData) => prevData.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="md">
      {/* Header */}
      <Box textAlign="center" my={4}>
        <Typography variant="h4" component="h1">
          User Details
        </Typography>
      </Box>

      {/* Responsive Button Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on larger screens
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleGetUser}
          sx={{ width: { xs: "100%", sm: "auto" } }} // Full width on mobile
        >
          Get User
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Verified User
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Non-Verified User
        </Button>
      </Box>

      {/* Responsive Grid for Displaying User Data */}
      <Grid container spacing={2}>
        {userData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {item.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Username:</strong> {item.username}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Role:</strong> {item.role}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Verified:</strong> {item.verified ? "Yes" : "No"}
                </Typography>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default User_Details;
