import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import "./admin.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ maxWidth: '80vw', overflowX: 'auto', margin: '0 auto' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Фамилия</TableCell>
                    <TableCell align="right">Имя</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Дата регистрации</TableCell>
                    <TableCell align="right">Статус</TableCell>
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={user.email || index}>
                      <TableCell component="th" scope="row">{user.lastName}</TableCell>
                      <TableCell align="right">{user.firstName}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.registeredAt}</TableCell>
                      <TableCell align="right">{user.status}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => navigate(`/user/${user.email}`)}
                          sx={{ 
                            mt: 2,
                            width: { xs: '100%', sm: 'auto' },
                          }}
                        >
                          Подробнее
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
  );
}