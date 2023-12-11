import express, { Router } from 'express';
import cors from 'cors';
import { envs } from '../config';

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3001, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  public async start() {
    // middlewares
    this.app.use(express.json());

    // cors
    const whitelist = [envs.FRONTEND_URL];

    const corsOptions = {
      origin: function (origin: any, callback: any) {
        console.log({ origin });
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };

    this.app.use(cors(corsOptions));

    // routes
    this.app.use(this.routes);

    // port listening
    this.app.listen(this.port, () => {
      console.log(
        `🛡️ Server listening on port: ${this.port} 🛡️
🌐 http://localhost:${this.port}`
      );
    });
  }
}
