const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandler } = require('./src/middleware/errorHandler');
const { connectDB } = require('./src/config/db');
const swaggerConfig = require('./src/config/swagger');

const app = express();
connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());

//import routes 
const authRoutes = require('./src/routes/authRoutes');
const productionRoutes = require('./src/routes/productionRoutes');
const machineRoutes = require('./src/routes/machineRoutes');
const operationRoutes = require('./src/routes/productionOperationRoutes');
const machineOperationsRoutes = require('./src/routes/machineOperationRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productModuleRoutes = require('./src/routes/productModuleRoutes');
const productDetailRoutes = require('./src/routes/processDetailRoutes');
const PPICRoutes = require('./src/routes/ppicRoutes');
const machineDetailRoutes = require('./src/routes/prosesDetailMachineRoutes');
const machineModuleRoutes = require('./src/routes/machineModuleRoutes');





app.use(express.json());

//ini mengambil routes
app.use('/api/auth', authRoutes);
app.use('/api', productionRoutes);
app.use('/api', machineRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api', userRoutes);
app.use('/api', productModuleRoutes);
app.use('/api', productDetailRoutes);
app.use('/api', PPICRoutes);
app.use('/api', machineDetailRoutes);
app.use('/api', machineModuleRoutes);


swaggerConfig(app);





app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
