import { useParams } from "react-router-dom/dist/umd/react-router-dom.development"
import { API_URLS } from "../Services/ApiUrls"
import { useEffect, useState } from "react"
import { CustomAlert } from "../customAlerts/customAlert";
import { Paper, Button } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


export const ProductsPage = (params) => {
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [alert, setAlert] = useState([])
    const [disabled, setDisabled] = useState(true)

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

    const changePrice = (idx, value) => {
        products[idx]['price'] = value
        setProducts(products)
    }

    const saveUpdatedPric = async (e) => {
        e.preventDefault()
        // console.log(products)
        try {
            const { isSuccess } = await API_URLS.updatePrice(products)
            if (isSuccess) {
                window.alert('Updated successfully')
                setDisabled(true)
            }
        } catch (err) {
            window.alert('Some error occurred')
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Paper style={{ width: "80%", padding: '0px 30px 0px 30px', border: "1px solid black", display: "flex", flexDirection: 'column', alignItems: "center", margin: "auto", marginTop: '20px', marginBottom: '10px' }}>
            <h2>{category.toUpperCase()} <Button onClick={() => { setDisabled(!disabled) }}><EditIcon /></Button></h2>
            <fieldset disabled={disabled} style={{ border: 'none' }}>
                <form onSubmit={(e) => saveUpdatedPric(e)} >
                    <Table style={{ width: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Sr. No.</TableCell>
                                <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Name</TableCell>
                                <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Image</TableCell>
                                <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Price</TableCell>
                                <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products && products.length > 0 ?
                                products.map((product, idx) => {
                                    return <TableRow key={product._id}>
                                        <TableCell align='center' style={{ border: "1px solid black" }} >{idx + 1}</TableCell>
                                        <TableCell align='center' style={{ border: "1px solid black" }} >{product.name}</TableCell>
                                        <TableCell align='center' style={{ border: "1px solid black" }} >
                                            <img
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                                src={product.image}
                                                alt='Product Image' />
                                        </TableCell>
                                        <TableCell align='center' style={{ border: "1px solid black" }}>{product.description}</TableCell>
                                        <TableCell align='center' style={{ border: "1px solid black" }}>
                                            <input
                                                type='number'
                                                style={disabled ? { border: "none", textAlign: 'center', background: 'none' } : { border: "1px solid black" }}
                                                onChange={(e) => changePrice(idx, e.target.value)}
                                                defaultValue={products[idx]['price']}
                                                required
                                            />
                                        </TableCell>
                                    </TableRow>
                                })
                                :
                                null}
                        </TableBody>
                    </Table>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "10px", width: '100%', marginBottom: '10px' }}>
                        {alert && <CustomAlert alert={alert} />}
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                    </div>
                </form>
            </fieldset>
        </Paper>
    )
}