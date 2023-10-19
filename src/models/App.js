import http from 'node:http'
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import { Server } from 'socket.io';
import { connectDB } from '../database/db.js';
import { createRoles, createAdmin } from '../helpers/initialSetup.js';
import { socketController } from '../sockets/controller.js';
import authRouter from '../routes/auth.js';
import userRouter from '../routes/user.js';
import productRouter from '../routes/product.js';
import categoryRouter from '../routes/category.js' 
import orderRouter from '../routes/order.js'


export class App {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: 'http://localhost:5173'
      }
    });

    this.port = process.env.PORT ?? 8080;

    this.paths = {
      auth: '/api/auth',
      category: '/api/categories',
      product: '/api/products',
      user: '/api/users',
      order: '/api/orders',
    }

    this.connectionDB();
    this.initialSetup();
    this.middlewares();
    this.routes();
    this.sockets();
  }

  async connectionDB() {
    await connectDB();
  }

  initialSetup() {
    createRoles();
    createAdmin();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use( express.static('public') );
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : './upload'
    }));
  }

  routes() {
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.user, userRouter);
    this.app.use(this.paths.product, productRouter);
    this.app.use(this.paths.category, categoryRouter);
    this.app.use(this.paths.order, orderRouter);
  }

  sockets() {
    this.io.on('connection', socketController)
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server is running on port =>", this.port);
    });
  }
}
