import React, { useState } from "react";
import AdminPanel from "../AdminPannel";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { convertToBase64 } from "../utils/utils";
import toast from "react-hot-toast";
import axios from "axios";
const Addpro = () => {
  const [file, setFile] = useState();
  const [product, setProduct] = useState({
    pname: "",
    pprice: "",
    pdesc: "",
    pcat: "",
    pqty: "",
    pimg: new File([], ""),
  });
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    setProduct({ ...product, [e.target.name]: e.target.files[0] });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast.loading("Loading...");
    const { pname, pprice, pcat, pdesc, pqty, pimg } = product;
    console.log(pname, pprice, pcat, pdesc, pqty, pimg);
    if ((pname, pprice, pcat, pdesc, pqty, pimg)) {
      const formdata = new FormData();
      formdata.append("pname", product.pname);
      formdata.append("pprice", product.pprice);
      formdata.append("pdesc", product.pdesc);
      formdata.append("pcat", product.pcat);
      formdata.append("pqty", product.pqty);
      formdata.append("pimg", product.pimg);
      console.log(formdata);
      formdata.forEach((a) => {
        console.log(a);
      });
      const { data } = await axios.post(
        "http://localhost:8000/api/add-product",
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (data.status === "success") {
        toast.dismiss(toastId);
        toast.success(data.message, {
          duration: 4000,
          position: "top-center",
        });
        setProduct({
          pname: "",
          pprice: "",
          pdesc: "",
          pcat: "",
          pqty: "",
          pimg: new File([], ""),
        });
        // navigate("/signin");
      } else {
        toast.dismiss(toastId);
        toast.error(data.message, {
          duration: 4000,
          position: "top-center",
        });
        // navigate("/signup");
      }
    } else {
      toast.dismiss(toastId);
      toast.error("Please fill all the fields :-( ", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <AdminPanel />
      </Grid>
      <Grid item xs={9}>
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
                  name="pname"
                  onChange={(e) => {
                    setProduct({ ...product, [e.target.name]: e.target.value });
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  name="pprice"
                  variant="outlined"
                  type="number"
                  value={product.pprice}
                  onChange={(e) => {
                    setProduct({ ...product, [e.target.name]: e.target.value });
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="pdesc"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={product.pdesc}
                  onChange={(e) => {
                    setProduct({ ...product, [e.target.name]: e.target.value });
                  }}
                  required
                />
                <Box mt={3}></Box>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    defaultValue={product.pcat}
                    name="pcat"
                    onChange={(e) => {
                      // console.log(e.target.name);
                      setProduct({
                        ...product,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="sports">fashion</MenuItem>
                    <MenuItem value="home-applience">Home applience</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  style={{ marginTop: "10px" }}
                  fullWidth
                  label="quantity"
                  name="pqty"
                  value={product.pqty}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    // console.log(e.target.name);
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="logo-s" style={{ width: "100%" }}>
                  <div>
                    <label
                      style={{
                        marginTop: "10px",
                        width: "200px",
                        height: "110px",
                      }}
                      htmlFor="profile"
                    >
                      <img
                        // className="product_img"
                        src={file}
                        alt=""
                        style={{ width: "450px", height: "200px" }}
                      />
                    </label>
                    <input
                      className="file"
                      accept="image/*"
                      id="profile"
                      name="pimg"
                      type="file"
                      onChange={onUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
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
      </Grid>
    </Grid>
  );
};

export default Addpro;
