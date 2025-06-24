const express = require("express");
const zod = require("zod");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userroutes = require('./routes/user.routes');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./openapi.yaml");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Use this for development/testing to allow only your frontend
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));

app.use(express.json());

mongoose.connect(process.env.URL_database)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('running');
});

app.use('/api', userroutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
