import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const Addpro = () => {
  const [product, setProduct] = useState({
    pname:"",
    pprice:"",
    pcat:"",
    pdesc:"",
    pimg:new File([],"")
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(product)
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              value={product.pname}
              name='pname'
              onChange={(e)=>{setProduct({...product,[e.target.name]:e.target.value})}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name='pprice'
              variant="outlined"
              type="number"
              value={product.pprice}
              onChange={(e)=>{setProduct({...product,[e.target.name]:e.target.value})}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name='pdesc'
              variant="outlined"
              multiline
              rows={4}
              value={product.pdesc}
              onChange={(e)=>{setProduct({...product,[e.target.name]:e.target.value})}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              name='pimg'
              // value={product.pimg}
              accept="image/*"
              onChange={(e)=>{setProduct({...product,[e.target.name]:e.target.value})}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Addpro;