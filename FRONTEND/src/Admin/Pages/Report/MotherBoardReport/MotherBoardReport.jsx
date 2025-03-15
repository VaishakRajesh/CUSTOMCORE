import React, { useEffect, useState } from 'react'
import Style from './MotherBoardReport.module.css'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const MotherBoardReport = () => {
    const [MotherboardArray, setMotherboardArray] = useState([])
    const [TypeArray, setTypeArray] = useState([])
    const [CompanyArray, setCompanyArray] = useState([])
    const rowsWithId = MotherboardArray.map((row, index) => ({ ...row, type: row.typeId.typeName,company: row.companyId.companyName, id: index + 1 }));
    
    const fetchmotherboard = () => {
        axios.get("http://localhost:5000/collectionMotherboard").then((response) => {
            console.log(response.data);
            setMotherboardArray(response.data);
        })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/collectionMotherboard/${id}`).then((response) => {
            fetchmotherboard();
            console.log(response)
        }).catch((err) => {
            console.log(err);

        })
    }
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'motherboardName', headerName: 'MotherBoard Name', flex: 2 },
        { field: 'type', headerName: 'Type Name', flex: 3 },
        { field: 'company', headerName: 'Company Name', flex: 3 },
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
        fetchmotherboard();
    }, [])
    const paginationModel = { page: 0, pageSize: 5 };
    return (

        <div className={Style.Types}>
            <div className={Style.Text}>Types of MotherBoard</div>
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

export default MotherBoardReport