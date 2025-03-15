import React, { useEffect, useState } from 'react'
import Style from './CompanyReport.module.css'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const CompanyReport = () => {
    const [CompanyArray, setCompanyArray] = useState([])
    const rowsWithId = CompanyArray.map((row, index) => ({ ...row, id: index + 1 }));

    const fetchCompany = () => {
        axios.get("http://localhost:5000/collectionCompany").then((response) => {
            console.log(response.data);
            setCompanyArray(response.data.company);
        })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/collectionCompany/${id}`).then((response) => {
            fetchCompany();
            console.log(response)
        }).catch((err) => {
            console.log(err);

        })
    }
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'companyName', headerName: 'Company Name', flex: 3 },
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
        fetchCompany();
    }, [])
    const paginationModel = { page: 0, pageSize: 5 };
    return (

        <div className={Style.Types}>
            <div className={Style.Text}>Types of Company</div>
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

export default CompanyReport