import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Card, CardContent, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, Box, Grid } from "@mui/material";

export default function UserDetailPage() {
  const { userEmail } = useParams(); // Получаем email из URL
  const navigate = useNavigate();
  
  // Состояния
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false); // Для сообщения о сохранении

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find((user) => user.email === userEmail);
  
    // Логирование для отладки
    console.log("Найденный пользователь:", foundUser);
  
    setUser(foundUser);
    setEditedUser(foundUser); // Инициализация данных для редактирования
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleStatusChange = (e) => {
    setEditedUser({ ...editedUser, status: e.target.value });
  };

  const handleSave = () => {
    // Сохраняем изменения в localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((user) =>
      user.email === editedUser.email ? editedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setDialogMessage("Информация сохранена!");
    setIsSaved(true);
    setOpenDialog(false);
  };

  const openConfirmationDialog = () => {
    setDialogMessage("Вы уверены, что хотите сохранить изменения?");
    setOpenDialog(true);
  };

  const handleDialogClose = (confirm) => {
    if (confirm) {
      handleSave(); // Сохранение
    } else {
      setOpenDialog(false); // Закрыть без изменений
    }
  };

  if (!user) {
    return <Typography variant="h6" color="error" align="center">Пользователь не найден</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card className="card-container" sx={{ width: { xs: "100%", sm: "500px" }, padding: "20px", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Подробности о пользователе
          </Typography>
          <Grid container spacing={0.5}> {/* Уменьшил spacing еще больше */}
            <Grid item xs={12}>
              <TextField
                label="Имя"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedUser.firstName || ""}
                name="firstName"
                onChange={handleChange}
                sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Фамилия"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedUser.lastName || ""}
                name="lastName"
                onChange={handleChange}
                sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedUser.email || ""}
                disabled
                sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Дата регистрации"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedUser.registeredAt || ""}
                disabled
                sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" sx={{ marginBottom: 0.5 }}>
                <InputLabel>Статус</InputLabel>
                <Select
                  value={editedUser.status || ""}
                  onChange={handleStatusChange}
                  name="status"
                  label="Статус"
                >
                  <MenuItem value="активный">Активный</MenuItem>
                  <MenuItem value="заблокирован">Заблокирован</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {editedUser.status === "заблокирован" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Дата и время блокировки"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.blockedAt || ""}
                    disabled
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Причина блокировки"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.blockReason || ""}
                    name="blockReason"
                    onChange={handleChange}
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Управление"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.management || ""}
                    name="management"
                    onChange={handleChange}
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Отдел"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.department || ""}
                    name="department"
                    onChange={handleChange}
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Должность"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.position || ""}
                    name="position"
                    onChange={handleChange}
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={openConfirmationDialog}
                sx={{ mt: 1 }}
                style={{ backgroundColor: "#3f06ff" }}
              >
                Сохранить изменения
              </Button>
            </Grid>
            {isSaved && (
              <Grid item xs={12}>
                <Typography variant="body1" color="success.main" align="center" sx={{ mt: 1 }}>
                  {dialogMessage}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => navigate("/admin")}
                style={{ backgroundColor: "#361087" }}
              >
                Назад к администратору
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Диалоговое окно подтверждения */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Подтверждение изменений</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Отменить
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
