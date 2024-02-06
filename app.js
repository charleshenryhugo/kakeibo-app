import express from 'express'
import path from 'path'
import apiRouter from './routes/api.js'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* serve React built files */
app.use(express.static('./client/build'))

app.use('/api', apiRouter)
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json('error');
});

export default app
