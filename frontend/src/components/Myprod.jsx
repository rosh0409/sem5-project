import { Box, Button, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';

const Myprod = () => {
    const rows=[
        {
           name:"phone",
           price:250,
           qty:2,
           expires:"22 october 2023",
           cat:"electronics" 
        },
        {
            name:"TV",
            price:22250,
            qty:12,
            expires:"22 october 2023",
            cat:"electronics" 
         },
         {
            name:"calculator",
            price:1250,
            qty:2,
            expires:"22 october 2023",
            cat:"electronics" 
         },
         {
            name:"phone",
            price:250,
            qty:2,
            expires:"22 october 2023",
            cat:"electronics" 
         },
         {
            name:"phone",
            price:250,
            qty:2,
            expires:"22 october 2023",
            cat:"electronics" 
         }
    ]
    return (
          <Box flex={4}>
            <Box className={"btn-add"} sx={{position:"absolute",bottom:"20px",textAlign:"center"}}>
              <Button sx={{borderRadius:"40%",height:"60px"}} variant="contained" color="secondary" >
                <AddIcon /> 
              </Button>
            </Box>
            <Box className="table">
              <Box p={2}>
                <Typography variant="h5" color="initial">Recently Added</Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Qty(g)</TableCell>
                      <TableCell align="right">Category</TableCell>
                      <TableCell align="right">Expires&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.qty}</TableCell>
                        <TableCell align="right">{row.cat}</TableCell>
                        <TableCell align="right">{row.expires}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
      
    )
}

export default Myprod
