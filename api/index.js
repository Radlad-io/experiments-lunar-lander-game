export default function handler(request, response) {
    response.status(200).json({
      message: 'Hello World',
      body: request.body,
      query: request.query,
      cookies: request.cookies,
    });
  }x