import React, { useEffect, useState } from 'react'
import Style from './CaseReport.module.css'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const CaseReport = () => {
    const [CaseArray, setCaseArray] = useState([])
    const rowsWithId = CaseArray.map((row, index) => ({ ...row, id: index + 1 }));

    const fetchCase = () => {
        axios.get("http://localhost:5000/collectionCase").then((response) => {
            console.log(response.data.cases);
            setCaseArray(response.data.cases);
        })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/collectionCase/${id}`).then((response) => {
            fetchCase();
            console.log(response)
        }).catch((err) => {
            console.log(err);

        })
    }
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'caseName', headerName: 'Case Name', flex: 3 },
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
        fetchCase();
    }, [])
    const paginationModel = { page: 0, pageSize: 5 };
    return (

        <div className={Style.Types}>
            <div className={Style.Text}>Types of Case</div>
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

export default CaseReport