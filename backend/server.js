const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require('./src/routes/products.routes');
const cartRoutes = require('./src/routes/cart.routes');
const addressRoutes = require('./src/routes/address.routes');
const orderRoutes = require('./src/routes/order.routes');
const uploadImage = require('./src/config/cloudinary'); 
dotenv.config();

const app = express();

app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());  

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);    
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/order', orderRoutes);


app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

 
 
connectDB();



app.get('/', (req, res) => {
    res.send('API is running...'); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})
