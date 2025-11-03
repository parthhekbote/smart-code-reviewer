require('dotenv').config(); // Load environment variables from .env file
const app = require('./src/app'); // Import the Express app instance

const PORT = process.env.PORT || 3000; // Use environment port or default to 3000

app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
});