const express = require('express')
const db = require('../database')
const auth = require('../middleware/auth.middleware')
const role = require('../middleware/role.middleware')

const router = express.Router()

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