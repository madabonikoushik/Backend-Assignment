const express = require('express')
const db = require('../database')
const auth = require('../middleware/auth.middleware')
const role = require('../middleware/role.middleware')

const router = express.Router()

router.get('/', auth, role(['admin']), (req, res) => {
  db.all(`SELECT id, name, email, role, status FROM users`, [], (err, rows) => {
    res.json(rows)
  })
})

router.patch('/:id/status', auth, role(['admin']), (req, res) => {
  const { status } = req.body
  if (!status) return res.status(400).json({ message: 'Invalid input' })

  db.run(
    `UPDATE users SET status = ? WHERE id = ?`,
    [status, req.params.id],
    () => res.json({ message: 'Status updated' })
  )
})

module.exports = router