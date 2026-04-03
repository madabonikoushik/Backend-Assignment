const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')
const db = require('../database')

const router = express.Router()
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Invalid input' })
  }

  const hashed = await bcrypt.hash(password, 10)

  db.run(
    `INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)`,
    [uuid(), name, email, hashed, role, 'active'],
    err => {
      if (err) return res.status(400).json({ message: 'User exists' })
      res.json({ message: 'User created' })
    }
  )
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  db.get(
    `SELECT * FROM users WHERE email = ? AND status = 'active'`,
    [email],
    async (err, user) => {
      if (!user) return res.status(401).json({ message: 'Invalid credentials' })

      const match = await bcrypt.compare(password, user.password)
      if (!match) return res.status(401).json({ message: 'Invalid credentials' })

      const token = jwt.sign({ id: user.id, role: user.role }, 'secret')
      res.json({ token })
    }
  )
})

module.exports = router