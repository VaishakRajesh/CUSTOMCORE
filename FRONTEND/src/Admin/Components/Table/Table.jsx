import React from 'react'
import Styles from './Table.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const List = () => {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
  return (
    <TableContainer component={Paper} className={Styles.tables}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className={Styles.TableCell}>Dessert (100g serving)</TableCell>
          <TableCell className={Styles.TableCell}>Calories</TableCell>
          <TableCell className={Styles.TableCell}>Fat&nbsp;(g)</TableCell>
          <TableCell className={Styles.TableCell}>Carbs&nbsp;(g)</TableCell>
          <TableCell className={Styles.TableCell}>Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell className={Styles.TableCell}>{row.calories}</TableCell>
            <TableCell className={Styles.TableCell}>{row.fat}</TableCell>
            <TableCell className={Styles.TableCell}>{row.carbs}</TableCell>
            <TableCell className={Styles.TableCell}>{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default List