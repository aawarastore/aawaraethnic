import React, { useContext } from 'react'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserContextApi } from '../context/UserContext';

const SizeChart = () => {

  const {isOpen,onClose} = useContext(UserContextApi)

  function createData(size, xs, s, m,l,xl,xxl) {
    return { size, xs, s, m,l,xl,xxl };
  }

  const rows = [
    createData('CHEST',38,40,42,44,46,48),
    createData('SHOULDER',17,17.5,18,18.5,19,19.5),
    createData('LENGTH',37,38,39,40,41,42),
    createData('SLEEVES',21,22,23,24,25,26),
    createData('WAIST',38,40,42,44,46,48),
    
  ];

  return (
    <> 
      {/* <div className='fixed w-screen z-[9999]'><Header /></div> */}
      <div className='absolute w-screen h-screen  z-[9999] flex justify-center items-center bg-[white] top-[23%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className=' md:w-[50vw] w-screen px-4  py-4 flex flex-col justify-center items-center '>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 240 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell onClick={onClose} className='cursor-pointer' align="right">close</TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell>Size</TableCell>
                  <TableCell align="right">34(XS)</TableCell>
                  <TableCell align="right">36(S)</TableCell>
                  <TableCell align="right">38(M)</TableCell>
                  <TableCell align="right">40(L)</TableCell>
                  <TableCell align="right">42(XL)</TableCell>
                  <TableCell align="right">44(XXL)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.size}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {/* <img className='h-[100px] w-[80px]' src={row.image_url} alt={row.image_url} /> */}
                      {row.size}
                    </TableCell>
                    <TableCell align="right">{row.xs}</TableCell>
                    <TableCell align="right">{row.s}</TableCell>
                    <TableCell align="right">{row.m}</TableCell>
                    <TableCell align="right">{row.l}</TableCell>
                    <TableCell align="right">{row.xl}</TableCell>
                    <TableCell align="right">{row.xxl}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      </>

  )
}

export default SizeChart
