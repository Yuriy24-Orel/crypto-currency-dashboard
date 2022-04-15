import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import './HistoryTable.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#eee',
    color: 'black',
    padding: '5px 15px',
    textAlign: 'left'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function HistoryTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = openSocket("http://localhost:8080");
    socket.on("ratedatasaved", (data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="history-table-wrapper">
      <TableContainer sx={{width: '65%', marginTop: '50px'}} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="history-table__date-time-cell"><div className="date-time-wrapper">Date and Time</div></StyledTableCell>
              <StyledTableCell>Currency From</StyledTableCell>
              <StyledTableCell>Amount 1</StyledTableCell>
              <StyledTableCell>Currency to</StyledTableCell>
              <StyledTableCell>Amount 2</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rateData && data.rateData.map((dataObject) => (
              <StyledTableRow key={dataObject._id}>
                <StyledTableCell>{dataObject.datetime}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {dataObject.cryptoCurrencyName}
                </StyledTableCell>
                <StyledTableCell>{dataObject.amount1 || 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {dataObject.base}
                </StyledTableCell>
                <StyledTableCell>{dataObject.amount2 || 1 / dataObject.cryptoCurrencyRate}</StyledTableCell>
                <StyledTableCell>{dataObject.type}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default HistoryTable;
