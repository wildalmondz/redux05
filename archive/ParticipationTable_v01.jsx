import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// keep but update for participation data
const columns = [
    { id: 'email', label: 'Email', minWidth: 170, align: 'center' },
    {
        id: 'requested',
        label: 'Requested',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'accepted',
        label: 'Accepted',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'locked',
        label: 'Locked',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'wildalmond',
        label: 'WildAlmond',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(0),
    },
];

export default function ParticipationTable({ data }) {

    const [participation, setParticipation] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [orderBy, setOrderBy] = React.useState('');
    const [order, setOrder] = React.useState('asc');

    const [foundData, setFoundData] = React.useState(0);

    if (data && foundData === 0) {
        setParticipation(data[0]); // Assuming you only have one item in the array
        setFoundData(1);
    }

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
                count={participation.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
