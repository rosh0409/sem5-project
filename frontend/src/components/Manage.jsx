import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Box } from "@mui/material";
import AdminPanel from "../AdminPannel";

const Manage = () => {
  const row = [
    {
      name: "phone",
      price: 250,
      qty: 2,
      ds: "22 october 2023",
      user: "raunak",
      odate: "22 may",
    },
    {
      name: "TV",
      price: 22250,
      qty: 12,
      ds: "22 october 2023",
      user: "roshan",
      odate: "22 may",
    },
    {
      name: "calculator",
      price: 1250,
      qty: 2,
      ds: "22 october 2023",
      user: "varad bhadwa",
      odate: "22 may",
    },
    {
      name: "phone",
      price: 250,
      qty: 2,
      ds: "22 october 2023",
      user: "mulla mc",
      odate: "22 may",
    },
    {
      name: "phone",
      price: 250,
      qty: 2,
      ds: "22 october 2023",
      user: "thatu or wott",
      odate: "22 may",
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <AdminPanel />
      </Grid>
      <Grid item xs={9}>
        <Box
          sx={{
            padding: "70px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Delivery status</TableCell>
                  <TableCell align="right">username</TableCell>
                  <TableCell align="right">order date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.ds}</TableCell>
                    <TableCell align="right">{row.user}</TableCell>
                    <TableCell align="right">{row.odate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Manage;
