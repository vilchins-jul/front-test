import express from 'express';
import firebase from 'firebase-admin';

const app = express();

// Инициализация Firebase
firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  databaseURL: 'https://your-project-id.firebaseio.com',
});

const db = firebase.firestore();

// Пример добавления пользователя в Firestore
app.post('/register', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    await db.collection('users').add({
      firstName,
      lastName,
      email,
      registeredAt: new Date(),
    });
    res.status(200).send('Пользователь добавлен');
  } catch (error) {
    console.error('Ошибка при добавлении пользователя: ', error);
    res.status(500).send('Ошибка сервера');
  }
});

app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});