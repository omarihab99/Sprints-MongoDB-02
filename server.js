const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const mongoose = require('mongoose');
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL).then(()=>console.log(chalk.green('Database connected'))).catch((err)=>console.log(err));
app.use(express.json());
app.use('/product', productRoute);
app.use('/user', userRoute);
app.listen(PORT, () => {
    console.log(chalk.green(`Server running on port ${PORT}`));
});