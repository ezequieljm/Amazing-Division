import express, { Request, Response } from 'express';
import path from 'path';
import { safediv } from './safediv';

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/api/divide', (req: Request, res: Response) => {
    const n1 = Number(req.query.n1);
    const n2 = Number(req.query.n2);

    const result = safediv(n1, n2);

    (result.tag === 'success')
        ? res.status(200).json({ status: 'success', value: result.value })
        : res.status(200).json({ status: 'failure', error: result.value })
});

app.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}`);
});
