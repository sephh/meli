import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

// /api/items
router.route('/').get(controllers.getItems)

// /api/items/:id
router.route('/:id').get(controllers.getItem)

export default router
