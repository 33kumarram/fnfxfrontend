import { useParams } from "react-router-dom/dist/umd/react-router-dom.development"
import { API_URLS } from "../Services/ApiUrls"
import { useEffect, useState } from "react"
import { CustomAlert } from "../customAlerts/customAlert";
import { Paper, Button } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";


export const ProductsPage = (params) => {
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [alert, setAlert] = useState([])
    const [disabled, setDisabled] = useState(false)

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type,
        });
        setTimeout(() => {
            setAlert({});
        }, 2000);
    };

    const fetchProducts = async () => {
        try {
            const { isSuccess, data } = await API_URLS.productsByCategory(category)
            if (isSuccess) {
                setProducts(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", margin: "auto", paddingTop: '50px', gap: '50px' }}>
            <h2>{category.toUpperCase()}</h2>
            {alert && <CustomAlert alert={alert} />}
            <Paper style={{ width: "80%", padding: '20px 30px 50px 30px' }}>
                <Table style={{ width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ width: '20%' }}>Sr. No.</TableCell>
                            <TableCell align='center' style={{ width: '20%' }}>Name</TableCell>
                            <TableCell align='center' style={{ width: '20%' }}>Image</TableCell>
                            <TableCell align='center' style={{ width: '20%' }}>Price</TableCell>
                            <TableCell align='center' style={{ width: '20%' }}>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products && products.length > 0 ?
                            products.map((product, idx) => {
                                return <TableRow key={product._id}>
                                    <TableCell align='center' >{idx + 1}</TableCell>
                                    <TableCell align='center' >{product.name}</TableCell>
                                    <TableCell align='center' >
                                        <img
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                            }}
                                            src={product.image}
                                            alt='Product Image' />
                                    </TableCell>
                                    <TableCell align='center' >{product.description}</TableCell>
                                    <TableCell align='center' >
                                        <form>
                                            <input type='numbe' value={product.price} />
                                        </form>
                                    </TableCell>
                                </TableRow>
                            })
                            :
                            null}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}