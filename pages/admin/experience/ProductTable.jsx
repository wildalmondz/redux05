import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const testData = [
    {"square_id":1607,"square_name":"Cab Sauv","square_status":"active","image_path":"https://wildalmonds.com/api/uploads/52842df1-2375-4f8b-8f71-df5fb71d8393_redWine.png"},
    {"square_id":1608,"square_name":"Merlot","square_status":"active","image_path":"https://wildalmonds.com/api/uploads/66e1a796-a775-48d1-a57d-ac336654a38d_redWine03.png"},
    {"square_id":1609,"square_name":"Riesling","square_status":"active","image_path":"https://wildalmonds.com/api/uploads/77b9e095-4f31-4b61-bbdf-143352509f3a_whiteWine.png"},
    {"square_id":1610,"square_name":"Pinot Gris","square_status":"active","image_path":"https://wildalmonds.com/api/uploads/2085d046-1771-4eb3-9ea3-1668f2024cf0_whiteWine02.png"},
    {"square_id":1611,"square_name":"Malbec","square_status":"active","image_path":"https://wildalmonds.com/api/uploads/66e1a796-a775-48d1-a57d-ac336654a38d_redWine03.png"},
    {"square_id":1624,"square_name":"Thoughts","square_status":"active","image_path":"https://wildalmonds.com/api/uploads/080a2429-e171-4404-800f-d5df20f382f5_waNoBack.png"},
    {"square_id":1626,"square_name":"Filler square 01","square_status":"active","image_path":null},
    {"square_id":1627,"square_name":"Filler square 02","square_status":"active","image_path":null},
    {"square_id":1628,"square_name":"Filler square 03","square_status":"active","image_path":null},
    {"square_id":1629,"square_name":"Filler square 04","square_status":"active","image_path":null},
    {"square_id":1630,"square_name":"Filler square 05","square_status":"active","image_path":null},
    {"square_id":1631,"square_name":"Filler square 06","square_status":"active","image_path":null},
    {"square_id":1632,"square_name":"joinTest","square_status":"active","image_path":null}
];

const columns = [
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

export default function ProductTable({ data, tournament_id }) {
    // Use testData as the initial state for productData
    const [productData, setProductData] = useState(testData);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        const fetchCollectionData = async () => {
            if (tournament_id !== '') {
                try {
                    // Fetch data using tournament_id
                    const collectionResponse = await fetch(`http://localhost:4500/admintournament_v2/${tournament_id}`, {
                        credentials: 'include', // Include credentials in the request
                    });

                    const returnedData = await collectionResponse.json();
                    setProductData(returnedData[2]); // Assuming you only have one item in the array
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
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
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