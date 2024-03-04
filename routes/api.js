import fs from 'fs'
import multer from 'multer'
import express from 'express'
import { executeSqlFind, executeUpsert, executeDelete } from '../libs/cosmosdb.js'
import { analyzeReceiptImage } from '../libs/documentIntelligence.js'

const router = express.Router()

router.get('/serverStatus', (req, res, next) => {
  res.json({ message: 'Server is running!'})
});

router.post('/upsertExpense', async (req, res) => {
  const expenseData = req.body
  const result = await executeUpsert(expenseData)

  res.json({ statusCode: result.statusCode })
})

router.post('/deleteExpense', async (req, res) => {
  const { id, year, month, categoryId } = req.body
  const result = await executeDelete(id, [Number(year), Number(month), Number(categoryId)])

  res.json({ statusCode: result.statusCode })
})

router.post('/getMonthlyExpenses', async (req, res) => {
  const { year, month } = req.body
  const result = await executeSqlFind({year, month})

  res.json({ result })
})

const upload = multer({ dest: 'receipt-uploads/' })
router.post('/analyzeReceiptImage', upload.single('image'), async (req, res) => {
  try {
    const path = req.file.path
    const imageBuffer = fs.readFileSync(req.file.path)
    const result = await analyzeReceiptImage(imageBuffer)
    fs.unlinkSync(path)

    res.json({ result })
  } catch (error) {
    res.json({ error: error.message })
  }
})

export default router
