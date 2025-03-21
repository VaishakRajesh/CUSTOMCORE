import React from 'react'
import Styles from './Table.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserList = () => {
    function createData(id, username, email, fullName, registrationDate) {
        return { id, username, email, fullName, registrationDate };
    }
    
    const rows = [
        createData(1, 'johndoe', 'john@example.com', 'John Doe', '2023-01-15'),
        createData(2, 'janedoe', 'jane@example.com', 'Jane Doe', '2023-02-20'),
        createData(3, 'bobsmith', 'bob@example.com', 'Bob Smith', '2023-03-10'),
        createData(4, 'alicej', 'alice@example.com', 'Alice Johnson', '2023-04-05'),
        createData(5, 'maryw', 'mary@example.com', 'Mary Williams', '2023-05-12'),
    ];

    return (
        <TableContainer component={Paper} className={Styles.tables}>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
                <TableHead>
                    <TableRow>
                        <TableCell className={Styles.TableCell}>ID</TableCell>
                        <TableCell className={Styles.TableCell}>Username</TableCell>
                        <TableCell className={Styles.TableCell}>Email</TableCell>
                        <TableCell className={Styles.TableCell}>Full Name</TableCell>
                        <TableCell className={Styles.TableCell}>Registration Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell className={Styles.TableCell}>{row.username}</TableCell>
                            <TableCell className={Styles.TableCell}>{row.email}</TableCell>
                            <TableCell className={Styles.TableCell}>{row.fullName}</TableCell>
                            <TableCell className={Styles.TableCell}>{row.registrationDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserList