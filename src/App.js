import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { NavigateNext, NavigateBefore } from '@material-ui/icons';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 800,
    margin: '0 auto',
    marginTop: 20,
    marginBottom: 20,
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationButton: {
    marginLeft: 5,
    marginRight: 5,
  },
});

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const classes = useStyles();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hapi-books.p.rapidapi.com/nominees/romance/2020', {
        headers: {
          'X-RapidAPI-Key': 'bbb11c7d87mshd56898679c28a7ep1c5aa6jsnf3a95c6d02c4',
          'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com',
        },
      });
      // console.log(response.data) 
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const tableData = data ? data.slice(
  currentPage * rowsPerPage,
  currentPage * rowsPerPage + rowsPerPage
) : [];

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Votes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.book_id}>
                <TableCell component="th" scope="row">
                  {row.book_id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.votes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data && (
  <div className={classes.pagination}>
    <IconButton
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 0}
    >
      <KeyboardArrowLeft />
    </IconButton>
    <span>{`Page ${currentPage + 1} of ${Math.ceil(data.length / rowsPerPage)}`}</span>
    <IconButton
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === Math.ceil(data.length / rowsPerPage) - 1}
    >
      <KeyboardArrowRight />
    </IconButton>
    <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
    <span>{`Showing ${tableData.length} of ${data.length} entries`}</span>
  </div>
)}

</>
);
};

export default App;
