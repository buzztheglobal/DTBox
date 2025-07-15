// src/components/password_info/ExamplesSection.jsx
import React from 'react';
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { cardBoxStyle, pageTitleStyle }  from '../../styles/globalStyles';

const rows = [
  ["Uppercase + Lowercase + Numbers", "Xy7Zm9Pk3", "9", "Good"],
  ["Uppercase + Lowercase + Special", "Kj#nM@pL$", "9", "Good"],
  ["Uppercase + Lowercase + Numbers + Special", "vK9#mP2$nL3%", "12", "Very Strong"],
  ["Passphrase with Mixed Characters", "Bl3u!M00n2025$", "14", "Extremely Strong"],
  ["Random with Extended Special Characters", "`x9~Q$2kL#", "10", "Extremely Strong"]
];

const ExamplesSection = () => (
  <Box sx={cardBoxStyle} mb={4}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>Example Passwords</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><strong>Combination Type</strong></TableCell>
          <TableCell><strong>Example Password</strong></TableCell>
          <TableCell><strong>Length</strong></TableCell>
          <TableCell><strong>Security Level</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default ExamplesSection;
