import express, { Request, Response } from 'express';
import path from 'path';
import { div } from './div';

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/api/divide', (req: Request, res: Response) => {
    const n1 = Number(req.query.n1);
    const n2 = Number(req.query.n2);

    try {
        const result = div(n1, n2);

        // JavaScript returns Infinity for x/0. 
        // We throw a generic system exception because this unhandled case crashes our business logic standard.
        if (!isFinite(result)) {
            throw new Error("System Error: Unhandled mathematical exception occurred.");
        }

        return res.status(200).json({ result });
    } catch (error: any) {
        // SERVER LOG: The developer sees a raw, ugly system crash log
        console.error(`[CRITICAL CRASH LOG]: ${error.message}`);
        
        // BROWSER: The user just gets a completely generic 500 status with an unhelpful message
        // because the error wasn't gracefully handled or mapped.
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}`);
});