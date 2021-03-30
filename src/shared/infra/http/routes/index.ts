import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

export const appRoutes = Router()

appRoutes.use('/categories', categoriesRoutes)
appRoutes.use('/specifications', specificationsRoutes)
appRoutes.use('/users', usersRoutes)
appRoutes.use(authenticateRoutes)