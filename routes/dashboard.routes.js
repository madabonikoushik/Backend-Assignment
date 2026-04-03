const express = require('express')
const db = require('../database')
const auth = require('../middleware/auth.middleware')
const role = require('../middleware/role.middleware')

const router = express.Router()
/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get income, expense, and balance summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 income:
 *                   type: number
 *                 expense:
 *                   type: number
 *                 balance:
 *                   type: number
 */
router.get('/summary', auth, role(['admin', 'analyst']), (req, res) => {
  db.all(
    `SELECT 
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) as expense
     FROM records`,
    [],
    (err, rows) => {
      const income = rows[0].income || 0
      const expense = rows[0].expense || 0
      res.json({
        income,
        expense,
        balance: income - expense
      })
    }
  )
})

module.exports = router