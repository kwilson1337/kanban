import { useBase, createRouter, defineEventHandler } from 'h3'
import * as projectController from '@/server/controllers/projects'
import * as userController from '@/server/controllers/users'

const router = createRouter();

/**
Projects
*/
router.post('/projects', defineEventHandler(projectController.createProject))
router.get('/projects/user/:id', defineEventHandler(projectController.fetchUserProjects))

/**
Users
*/
router.get('/users/:id', defineEventHandler(userController.fetchUserFromId))

export default useBase('/api', router.handler)