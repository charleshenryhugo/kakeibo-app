import { executeSqlFind } from '../libs/cosmosdb.js'
import express from 'express'
const router = express.Router()

router.get('/serverStatus', (req, res, next) => {
  res.json({ message: 'Server is running!'})
});

router.get('/getIncomes', async (req, res) => {
  const incomes = await executeSqlFind('type', 'Income')
  res.json(incomes)
})

export default router
