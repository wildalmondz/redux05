import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ReportCard = styled(Card)({
    maxWidth: 600,
    margin: 'auto',
    marginTop: 20,
});

const ReportComponent = ({ data }) => {
    const {
        gameName,
        scores,
    } = data[0]; // Assuming you only have one item in the array

    // Array of colors for each bar
    const barColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#ff6a00'];

    return (
        <ReportCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {gameName}
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Scores
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={scores}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 20, // Increased bottom margin to accommodate x-axis labels
                        }}
                    >
                        <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={60} />
                        <YAxis />
                        <Tooltip content={() => null} />
                        {scores.map((score, index) => (
                            //<Bar key={score.id} dataKey="total" fill={barColors[index % barColors.length]} />
                            <Bar key={score.id} dataKey="total" fill={'#8884d8'} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>

                <Typography variant="h6" gutterBottom>
                    Scoring
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scores.map((score) => (
                                <TableRow key={score.id}>
                                    <TableCell>{score.name}</TableCell>
                                    <TableCell>{score.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Add more sections as needed */}
            </CardContent>
        </ReportCard>
    );
};

export default ReportComponent;
