import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const ReportCard = styled(Card)({
    maxWidth: 600,
    margin: 'auto',
    marginTop: 20,
});

const ReportComponent = ({ data }) => {
    const {
        gameName,
        scores,
        participation
    } = data[0]; // Assuming you only have one item in the array

    console.log(JSON.stringify(participation));

    // Sort scores by total in descending order
    const sortedScores = scores.slice().sort((a, b) => b.total - a.total);

    // Extract top five items
    const topFive = sortedScores.slice(0, 5);

    // Calculate the total of remaining items
    const otherTotal = sortedScores.slice(5).reduce((acc, score) => acc + score.total, 0);

    // Array of colors for each segment in the pie chart
    const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#ff6a00', '#999999']; // Add a color for "Other"

    // Create data for the pie chart
    const pieData = [...topFive, { name: 'Other', total: otherTotal }];

    return (
        <ReportCard>
            {JSON.stringify(participation)}

            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {gameName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Scoring - Pie Chart
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="total"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <Typography variant="h6" gutterBottom>
                    Scoring - Table
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
