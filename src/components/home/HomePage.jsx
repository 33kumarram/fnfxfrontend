import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState, useEffect } from "react"
import { API_URLS } from "../Services/ApiUrls";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Button, Paper } from "@mui/material";

export const HomePage = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

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
            <Paper style={{ width: "80%", padding: '20px 30px 50px 30px', border: '1px solid black' }}>
                <h2>PRODUCT CATEGORIES</h2>
                <Table style={{ width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ width: '25%', border: '1px solid black' }}>Sr. No.</TableCell>
                            <TableCell align='center' style={{ width: '25%', border: '1px solid black' }}>Category</TableCell>
                            <TableCell align='center' style={{ width: '25%', border: '1px solid black' }}>No. of Items</TableCell>
                            <TableCell align='center' style={{ width: '25%', border: '1px solid black' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories && categories.length > 0 ?
                            categories.map((ctgry, idx) => {
                                return <TableRow key={ctgry.category}>
                                    <TableCell align='center' style={{ border: '1px solid black' }} >{idx + 1}</TableCell>
                                    <TableCell align='center' style={{ border: '1px solid black' }} >{ctgry.category}</TableCell>
                                    <TableCell align='center' style={{ border: '1px solid black' }} >{ctgry.count}</TableCell>
                                    <TableCell align='center' style={{ border: '1px solid black' }} ><Button color="primary" onClick={() => { navigate(`/products/${ctgry.category}`) }}>...More</Button></TableCell>
                                </TableRow>
                            })
                            :
                            null}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};
