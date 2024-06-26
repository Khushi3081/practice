import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { Routes } from './interface/route.interface';
import { API_PORT, NODE_ENV } from './config';

export default class App {
  readonly app: express.Application;
  readonly env: string;
  readonly API_PORT: string | number;
  constructor(data: { apiRoutes: Routes[] }) {
    this.app = express();

    this.env = NODE_ENV || 'development';
    this.API_PORT = API_PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(data.apiRoutes);
  }

  private readonly initializeMiddlewares = () => {
    this.app.set('trust proxy', 1);
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    if (NODE_ENV === 'development') {
      this.app.use(
        session({
          cookie: {
            secure: true,
            maxAge: 60000,
          },
          secret: 'secret',
          resave: false,
          saveUninitialized: true,
        }),
      );
    }
  };

  private readonly initializeRoutes = (routes: Routes[], setVersion = true) => {
    routes.forEach((route) => {
      this.app.use( route.router);
    });
  };

  public listen = async () => {
    this.app.listen(this.API_PORT, () => {
      console.log('=================================');
      console.log(`======= ENV: ${this.env} ========`);
      console.log(`App listening on the port ${this.API_PORT}`);
      console.log('=================================');
    });
    
  };
}
