const app = require('./src/config/custom-express');

app.listen(3000, () => {
    console.log('The server is listening at http://localhost:3000');
});