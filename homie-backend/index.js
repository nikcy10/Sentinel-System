import express from 'express';
// import { PORT } from './utils/constants.js';
const PORT = 5000;
const app = express();
import cors from 'cors';
import { initprisma, prisma } from './Initializer/initprisma.js';
app.use(express.json());
import { initRoutes } from './Initializer/initRoutes.js';
app.use(cors());
initprisma();
initRoutes(app);
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("http://localhost:" + PORT)
})