import { createServer } from 'node:http';

const port = Number(process.env.PORT ?? 4173);
const sessionCookie = 'session=authenticated';

function sendHtml(response, statusCode, html, headers = {}) {
  response.writeHead(statusCode, {
    'content-type': 'text/html; charset=utf-8',
    ...headers,
  });
  response.end(html);
}

function loginPage(message = '') {
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Local Test App - Login</title></head>
  <body>
    <main>
      <h1>Login</h1>
      ${message ? `<p id="flash" role="status">${message}</p>` : ''}
      <form action="/login" method="post">
        <label for="username">Username</label>
        <input id="username" name="username" autocomplete="username" required>
        <label for="password">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required>
        <button type="submit">Login</button>
      </form>
    </main>
  </body>
</html>`;
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`);

  if (request.method === 'GET' && url.pathname === '/login') {
    const message = url.searchParams.has('logout')
      ? 'You logged out of the secure area!'
      : url.searchParams.has('error')
        ? 'Your username or password is invalid!'
        : '';
    sendHtml(response, 200, loginPage(message));
    return;
  }

  if (request.method === 'POST' && url.pathname === '/login') {
    let body = '';
    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      const form = new URLSearchParams(body);
      const validCredentials =
        form.get('username') === 'tomsmith' &&
        form.get('password') === 'SuperSecretPassword';

      response.writeHead(302, {
        location: validCredentials ? '/secure' : '/login?error=1',
        ...(validCredentials ? { 'set-cookie': `${sessionCookie}; HttpOnly; SameSite=Lax; Path=/` } : {}),
      });
      response.end();
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/secure') {
    if (!request.headers.cookie?.split('; ').includes(sessionCookie)) {
      response.writeHead(302, { location: '/login' });
      response.end();
      return;
    }

    sendHtml(
      response,
      200,
      `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Local Test App - Secure Area</title></head>
  <body>
    <main>
      <h1>Secure Area</h1>
      <p id="flash" role="status">You logged into a secure area!</p>
      <form action="/logout" method="post"><button type="submit">Logout</button></form>
    </main>
  </body>
</html>`,
    );
    return;
  }

  if (request.method === 'POST' && url.pathname === '/logout') {
    response.writeHead(302, {
      location: '/login?logout=1',
      'set-cookie': 'session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0',
    });
    response.end();
    return;
  }

  sendHtml(response, 404, '<h1>Not Found</h1>');
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Local test app listening at http://127.0.0.1:${port}`);
});
