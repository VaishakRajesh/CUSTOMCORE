import React, { useEffect, useState } from 'react'
import Style from './SMPSReport.module.css'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const SMPSReport = () => {
    const [SMPSArray, setSMPSArray] = useState([])

    const rowsWithId = SMPSArray.map((row, index) => ({ ...row, motherboard: row.motherboardId.motherboardName, id: index + 1 }));
    
    const fetchSMPS = () => {
        axios.get("http://localhost:5000/collectionSMPS").then((response) => {
            console.log(response.data);
            setSMPSArray(response.data.smps);
        })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/collectionSMPS/${id}`).then((response) => {
            fetchSMPS();
            console.log(response)
        }).catch((err) => {
            console.log(err);

        })
    }
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'smpsName', headerName: 'SMPS name', flex: 2 },
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
        fetchSMPS();
    }, [])
    const paginationModel = { page: 0, pageSize: 5 };
    return (

        <div className={Style.SMPS}>
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

export default SMPSReport