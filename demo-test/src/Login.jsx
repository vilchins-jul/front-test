import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button, Box, List, ListItem, InputAdornment, ImageList, ImageListItem } from "@mui/material";
import { Mail, PasswordOutlined } from "@mui/icons-material";
import doneIcon from "./assets/done.svg";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => user.email === email && user.password === password);
  
    if (foundUser) {
      alert("Вход выполнен успешно!");
      localStorage.setItem("currentUser", JSON.stringify(foundUser)); // Сохраняем текущего пользователя
      window.location.href = "/admin"; // Редирект
    } else {
      setError("Неправильное имя пользователя или пароль");
    }
  };

  return (
    <div className="all">
      {/* Прямоугольник на фоне */}
      <div className="rectagular" />

    <div className="flex" style = {{ height: '100vh'}}>
      <Box>
        <Typography className="title" variant="h4" align="left">
        Автоматизированная Информационная Система - это:
        </Typography>
        <List className="list" style={{ margin: '30px 0 0' }}>
          <ListItem className="list-image"><ImageListItem><img className="image" src={doneIcon}/></ImageListItem>автоматизация процесса учета локальных нормативных актов</ListItem>
          <ListItem className="list-image"><ImageListItem><img className="image" src={doneIcon}/></ImageListItem>повышение исполнительской дисциплины по факту автоматизации процесса учета и контроль сроков исполнения документов</ListItem>
          <ListItem className="list-image"><ImageListItem><img className="image" src={doneIcon}/></ImageListItem>автоматизация поиска необходимых локальных нормативных актов и сопроводительных документов к ним</ListItem>
        </List>
      </Box>
      <Card className="card-container" style = {{ overflow: 'visible', boxShadow: '3px -3px 10px rgba(0, 0, 0, 0.2)' }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom style={{ color: '#361087', fontWeight: '600', fontSize: '2rem' }}>
            Вход
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            для зарегистрированных пользователей
          </Typography>
          <TextField
            fullWidth            
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            startAdornment={
              <InputAdornment position="start">
                 <Mail color="info" />
              </InputAdornment>
            }
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            startAdornment={
              <InputAdornment position="start">
                 <PasswordOutlined color="info" />
              </InputAdornment>
           }
          />
          {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }} style={{ backgroundColor: '#361087' }}>
            Войти
          </Button>
          <Typography variant="body2" align="center" mt={2}>
            Нет аккаунта? <Link to="/registration" style={{ color: "#361087" }}>Зарегистрироваться</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}