import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
