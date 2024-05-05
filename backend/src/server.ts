import App from './app';
import UserRoute from './routes/user.routes';

const app = new App({
  apiRoutes: [new UserRoute()],
});

app.listen();
