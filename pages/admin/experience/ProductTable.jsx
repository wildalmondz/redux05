import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

const testData = [
   {"square_id":1632,"square_name":"joinTest","square_status":"active","image_path":null}
];

const columns = [
    { id: 'square_id', label: 'Id', minWidth: 40, align: 'center' },
    { id: 'square_name', label: 'Square Name', minWidth: 170, align: 'center' },
    { id: 'square_description', label: 'Description', minWidth: 370, align: 'left' },
    {
        id: 'square_status',
        label: 'Status',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'image_path',
        label: 'Image',
        minWidth: 80,
        align: 'center',
        // Render the image using an <img> element
        format: (value) => (value ? <img src={value} alt="Product" style={{ width: '50px', height: '50px' }} /> : 'No Image'),
    }
];

export default function ProductTable({ groupId, tournament_id }) {
    // Use testData as the initial state for productData
    const [productData, setProductData] = useState(testData);
   // const [productData, setProductData] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        const fetchCollectionData = async () => {
            if (tournament_id !== '') {
                try {
                    // Fetch data using tournament_id
                    // const collectionResponse = await fetch(`http://localhost:4500/admintournament_v2/${tournament_id}`, {
                    const collectionResponse = await fetch(`http://localhost:4500/admin/products`, {
                        credentials: 'include', // Include credentials in the request
                    });

                    const returnedData = await collectionResponse.json();
                    console.log(JSON.stringify(returnedData));
                    setProductData(returnedData); // Assuming you only have one item in the array
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                }
            }
        };

        fetchCollectionData();
    }, [tournament_id]); // Empty dependency array means this effect runs once on mount

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleNewClick = () => {
        if (groupId === 0) {
            alert('Company/Group selection required to create items or products.')
        }
        else {
            window.location.href = `./createproduct/editor/${groupId}`;
        }
    };

    const handleSort = (columnId) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrderBy(columnId);
        setOrder(isAsc ? 'desc' : 'asc');
    };

    const sortedData = React.useMemo(() => {
        if (orderBy) {
            return [...productData].sort((a, b) => {
                const aValue = a[orderBy];
                const bValue = b[orderBy];
                if (aValue < bValue) {
                    return order === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return order === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return productData;
    }, [productData, orderBy, order]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Button
                type="submit"
                variant="contained"
                onClick={handleNewClick}
                style={{ height: '2em', marginLeft: '.5%' }}
            >
                New
            </Button>
            <br />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 'bold', cursor: 'pointer' }}
                                    onClick={() => handleSort(column.id)}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isEvenRow = index % 2 === 0;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                        style={{ backgroundColor: isEvenRow ? '#f0f0f0' : '#cad5e6' }}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                /*
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>


                                                 */

                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'image_path' ? (
                                                        value ? <img src={value} alt="Product" style={{ width: '50px', height: '50px' }} /> : 'No Image'
                                                    ) : (
                                                        column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={productData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}