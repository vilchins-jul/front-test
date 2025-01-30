import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || []; // Загружаем всех пользователей
    
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
    <div className="flex">
      <Card className="card-container">
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Автоматизированная Информационная Система
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            Вход для зарегистрированных пользователей
          </Typography>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
            Войти
          </Button>
          <Typography variant="body2" align="center" mt={2}>
            Нет аккаунта? <Link to="/registration" style={{ color: "#1976d2" }}>Зарегистрироваться</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}