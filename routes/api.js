import fs from 'fs'
import multer from 'multer'
import express from 'express'
import { executeSqlFindExpense, executeUpsertExpense, executeDeleteExpense, executeFetchCategories, executeDeleteCategory, executeUpsertCategory } from '../libs/cosmosdb.js'
import { analyzeReceiptImage } from '../libs/documentIntelligence.js'

const router = express.Router()

router.get('/serverStatus', (req, res, next) => {
  res.json({ message: 'Server is running!'})
});

router.post('/upsertExpense', async (req, res) => {
  const expenseData = req.body
  const result = await executeUpsertExpense(expenseData)

  res.json({ statusCode: result.statusCode })
})

router.post('/deleteExpense', async (req, res) => {
  const { id, year, month } = req.body
  const result = await executeDeleteExpense(id, [Number(year), Number(month)])

  res.json({ statusCode: result.statusCode })
})

router.post('/getMonthlyExpenses', async (req, res) => {
  const { year, month } = req.body
  const result = await executeSqlFindExpense({year, month})

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

router.get('/getCategories', async (_req, res) => {
  const result = await executeFetchCategories()
  res.json({ result })
})

router.post('/upsertCategory', async (req, res) => {
  const categoryData = req.body
  const result = await executeUpsertCategory(categoryData)

  res.json({ statusCode: result.statusCode, item: result.resource })
})

router.post('/deleteCategory', async (req, res) => {
  const { id } = req.body
  const result = await executeDeleteCategory(id)

  res.json({ statusCode: result.statusCode })
})

export default router
