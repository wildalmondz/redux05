import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

// keep but update for participation data
const columns = [
    { id: 'id', label: 'Id', minWidth: 20, align: 'center' },
    {
        id: 'name',
        label: 'Company/Group',
        minWidth: 40,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'title',
        label: 'Title',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'createdAt',
        label: 'Created',
        minWidth: 30,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 20,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'likes',
        label: 'Likes',
        minWidth: 10,
        align: 'center',
        format: (value) => value.toFixed(0),
    }
];

export default function BlogTable({ groupId, setBlogId, setBlogEditor }) {

    const [results, setResults] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    const participation  = results[0] || []; // Ensure participation is defined and initialized as an empty array if undefined

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`http://localhost:4500/blog/adminblog/${groupId}`, {
                    credentials: 'include', // Include credentials in the request
                });
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchInitialData();
    }, []); // Empty dependency array means this effect runs once on mount


    const handleNewClick = () => {
        window.location.href = `./blogs/blogcreate/${groupId}`;
    };

    const handleCellClick = (columnId, cellValue) => {
        if (columnId === 'id') {
            // set the view window active here
            setBlogId(cellValue);
            setBlogEditor(true);
        }
    };

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
            return [...participation].sort((a, b) => {
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
        return participation;
    }, [participation, orderBy, order]);

    return (
        <>
            <Button
                type="submit"
                variant="contained"
                onClick={handleNewClick}
                style={{ height: '2em', marginLeft: '.5%' }}
            >
                New
            </Button>
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
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        onClick={() => handleCellClick(column.id, value)}
                                                    >
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
                    count={participation.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}