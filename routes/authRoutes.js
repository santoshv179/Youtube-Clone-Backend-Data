

// export default router;
import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js' // adjust path if needed

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

// Add this route:
router.get('/me', protect, (req, res) => {
  res.json(req.user)
})

export default router