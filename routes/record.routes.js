const express = require('express')
const { v4: uuid } = require('uuid')
const db = require('../database')
const auth = require('../middleware/auth.middleware')
const role = require('../middleware/role.middleware')

const router = express.Router()
/**
 * @swagger
 * /records:
 *   post:
 *     summary: Add a financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *             properties:
 *               type:
 *                 type: string
 *                 example: income
 *               amount:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Record added
 */
router.post('/', auth, role(['admin']), (req, res) => {
  const { amount, type, category, date, description } = req.body
  if (!amount || !type || !category || !date) {
    return res.status(400).json({ message: 'Invalid input' })
  }

  db.run(
    `INSERT INTO records VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [uuid(), amount, type, category, date, description || '', req.user.id],
    () => res.json({ message: 'Record created' })
  )
})

router.get('/', auth, role(['admin', 'analyst', 'viewer']), (req, res) => {
  db.all(`SELECT * FROM records`, [], (err, rows) => {
    res.json(rows)
  })
})

router.delete('/:id', auth, role(['admin']), (req, res) => {
  db.run(`DELETE FROM records WHERE id = ?`, [req.params.id], () => {
    res.json({ message: 'Deleted' })
  })
})

module.exports = router