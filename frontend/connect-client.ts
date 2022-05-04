import {
  ConnectClient,
  MiddlewareContext,
  MiddlewareNext,
} from '@vaadin/fusion-frontend';
import { getAccessToken } from './auth';

const client = new ConnectClient({
  prefix: 'connect',
  middlewares: [
    async function addAuthHeaderMiddleware(
      context: MiddlewareContext,
      next: MiddlewareNext
    ) {
      const token = await getAccessToken();
      if (token) {
        context.request.headers.set(
          'Authorization',
          `Bearer ${token.accessToken}`
        );
      }
      return next(context);
    },
  ],
});
export default client;
