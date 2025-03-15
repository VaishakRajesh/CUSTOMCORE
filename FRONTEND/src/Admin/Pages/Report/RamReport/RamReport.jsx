import React, { useEffect, useState } from 'react'
import Style from './RamReport.module.css'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const RamReport = () => {
    const [RamArray, setRamArray] = useState([])

    const rowsWithId = RamArray.map((row, index) => ({ ...row, motherboard: row.motherboardId.motherboardName, id: index + 1 }));
    
    const fetchram = () => {
        axios.get("http://localhost:5000/collectionRam").then((response) => {
            console.log(response.data);
            setRamArray(response.data.ram);
        })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/collectionRam/${id}`).then((response) => {
            fetchram();
            console.log(response)
        }).catch((err) => {
            console.log(err);

        })
    }
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'ramName', headerName: 'Ram name', flex: 2 },
        { field: 'motherboard', headerName: 'MotherBoard Name', flex: 3 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            width: 350,
            renderCell: (params) => {
                return (
                    <>
                        <DeleteOutlineIcon
                            className="Delete"
                            onClick={() =>
                                deleteData(params.row._id)
                            }
                        />
                    </>
                );
            }
        }

    ];
    useEffect(() => {
        fetchram();
    }, [])
    const paginationModel = { page: 0, pageSize: 5 };
    return (

        <div className={Style.Ram}>
            <div className={Style.Text}>Types of Ram</div>
            <div className={Style.TextField}>
                <Paper sx={{ height: 400, width: '90%' }}>
                    <DataGrid
                        rows={rowsWithId}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
        </div>

    )
}

export default RamReport