export default function handler(request, response) {
  response.status(200).json({
    body: 'hello this is a response from the serverless function'
  });
}
