import React, { useState } from "react";
import AdminPanel from "../AdminPannel";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select"; //, { SelectChangeEvent }
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
      formdata.append("pimg", pimg);
      formdata.append("pname", pname);
      formdata.append("pprice", pprice);
      formdata.append("pdesc", pdesc);
      formdata.append("pcat", pcat);
      formdata.append("pqty", pqty);
      console.log(formdata);
      formdata.forEach((a) => {
        console.log(a);
      });
      const { data } = await axios.post(
        "http://localhost:8000/api/add-product",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
          },
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
        setFile("");
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
          <form onSubmit={handleSubmit}>
            <Card
              sx={{
                margin: "0px",
                padding: "40px",
              }}
            >
              <h1
                style={{
                  padding: "0px",
                  margin: "0px 0px 20px 0px",
                }}
              >
                Add Product
              </h1>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    variant="outlined"
                    value={product.pname}
                    name="pname"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        [e.target.name]: e.target.value,
                      });
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
                      setProduct({
                        ...product,
                        [e.target.name]: e.target.value,
                      });
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
                      setProduct({
                        ...product,
                        [e.target.name]: e.target.value,
                      });
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
                      value={product.pcat}
                      name="pcat"
                      onChange={(e) => {
                        // console.log(e.target.name);
                        setProduct({
                          ...product,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="Electronic">Electronic</MenuItem>
                      <MenuItem value="Cloth">Cloth</MenuItem>
                      <MenuItem value="Sport">Sport</MenuItem>
                      <MenuItem value="Toy">Toy</MenuItem>
                      <MenuItem value="Furniture">Furniture</MenuItem>
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
                        <CardMedia
                          component="img"
                          height="194"
                          image={file}
                          alt="Image not uploaded !"
                        />
                        {/* <img
                          // className="product_img"
                          label="Upload"
                          src={file}
                          alt=""
                          style={{ width: "450px", height: "200px" }}
                        /> */}
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
                    <Button
                      sx={{
                        width: "100%",
                      }}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Add Product
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </form>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Addpro;
