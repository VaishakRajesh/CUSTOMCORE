import React, { useEffect, useState } from 'react'
import Style from './CoolerReport.module.css'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const CoolerReport = () => {
    const [CoolerArray, setCoolerArray] = useState([])
    const rowsWithId = CoolerArray.map((row, index) => ({ ...row, id: index + 1 }));

    const fetchCooler = () => {
        axios.get("http://localhost:5000/collectionCooler").then((response) => {
            console.log(response.data);
            setCoolerArray(response.data);
        })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/collectionCooler/${id}`).then((response) => {
            fetchCooler();
            console.log(response)
        }).catch((err) => {
            console.log(err);

        })
    }
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'coolerName', headerName: 'Cooler Name', flex: 3 },
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
        fetchCooler();
    }, [])
    const paginationModel = { page: 0, pageSize: 5 };
    return (

        <div className={Style.Types}>
            <div className={Style.Text}>Types of Cooler</div>
            <div className={Style.TextField}>
                <Paper sx={{ height: 400, width: '100%' }}>
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

export default CoolerReport