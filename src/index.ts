import app from './server';
import 'dotenv/config';
import './routes';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (_req, res) => {
    res.send('Server is running');
});