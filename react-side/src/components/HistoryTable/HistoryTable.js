import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./HistoryTable.css";

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
      <TableContainer
        component={Paper}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className="history-table__date-time-cell">
                <div className="date-time-wrapper">Date and Time</div>
              </TableCell>
              <TableCell>Currency From</TableCell>
              <TableCell>Amount 1</TableCell>
              <TableCell>Currency to</TableCell>
              <TableCell>Amount 2</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rateData &&
              data.rateData.map((dataObject) => (
                <TableRow key={dataObject._id}>
                  <TableCell>{dataObject.datetime}</TableCell>
                  <TableCell component="th" scope="row">
                    {dataObject.cryptoCurrencyName}
                  </TableCell>
                  <TableCell>{dataObject.amount1 || 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {dataObject.base}
                  </TableCell>
                  <TableCell>
                    {dataObject.amount2 || 1 / dataObject.cryptoCurrencyRate}
                  </TableCell>
                  <TableCell>{dataObject.type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default HistoryTable;
