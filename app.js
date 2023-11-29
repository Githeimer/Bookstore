const express = require('express');
const { connectToDb, getDb } = require('./model/db');

// init app and middleware
const app = express();
app.use(express.json());

// db connection
connectToDb((err) => {
    if (!err) {
        const PORT = 3000;

        // Routes should be placed here after the database connection is established
        app.use('/', require('./routes/root'));
        app.use('/books',require('./routes/api/bookAPI'));

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
});
