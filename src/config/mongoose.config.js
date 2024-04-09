const mongoose = require('mongoose');

const connectToDB = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DATABASE_URI)
      .then(() => {
        console.log('Connected to database');
        resolve();
      })
      .catch((err) => {
        console.error(err?.message ?? 'Error connecting to database');
        reject();
      });
  });
};

module.exports = {
  connectToDB,
};
