import express, {Application, NextFunction, Request, Response} from "express";
import cors from 'cors';
import httpStatus from "http-status";


const app: Application = express()


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req:Request, res: Response , next: NextFunction) => {
    res.send('Wellcome to BOOK HAVEN BACKEND. All Routes are working.')
})

app.use(async (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Not found',
      errorMessage: [
        {
          path: req.originalUrl,
          message: 'Route not found',
        },
      ],
    });
    next();
  });

  export default app;