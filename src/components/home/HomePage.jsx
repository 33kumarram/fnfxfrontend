import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState, useEffect } from "react"
import { API_URLS } from "../Services/ApiUrls";
import { CustomAlert } from "../customAlerts/customAlert";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Button, Paper } from "@mui/material";

export const HomePage = () => {
    const [alert, setAlert] = useState()
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type,
        });
        setTimeout(() => {
            setAlert({});
        }, 2000);
    };

    const fetchCategories = async () => {
        try {
            const { isSuccess, data } = await API_URLS.fetchCategories()
            if (isSuccess) {
                setCategories(data)
            }
        } catch (err) {
            console.log(err)
        }


    }

    useEffect(() => {
        fetchCategories()
    }, [])


    return (
        <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", margin: "auto", paddingTop: '50px', gap: '50px' }}>
            <h2>Product Categories</h2>
            {alert && <CustomAlert alert={alert} />}
            <Paper style={{ width: "80%", padding: '20px 30px 50px 30px' }}>
                <Table style={{ width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ width: '25%' }}>Sr. No.</TableCell>
                            <TableCell align='center' style={{ width: '25%' }}>Category</TableCell>
                            <TableCell align='center' style={{ width: '25%' }}>No. of Items</TableCell>
                            <TableCell align='center' style={{ width: '25%' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories && categories.length > 0 ?
                            categories.map((ctgry, idx) => {
                                return <TableRow key={ctgry.category}>
                                    <TableCell align='center' style={{ width: '33%' }}>{idx + 1}</TableCell>
                                    <TableCell align='center' style={{ width: '33%' }}>{ctgry.category}</TableCell>
                                    <TableCell align='center' style={{ width: '33%' }}>{ctgry.count}</TableCell>
                                    <TableCell align='center' style={{ width: '33%' }}><Button color="primary" onClick={() => { navigate('/products') }}>...More</Button></TableCell>
                                </TableRow>
                            })
                            :
                            null}
                    </TableBody>
                </Table>
            </Paper>
            {console.log(categories)}
        </div>
    );
};