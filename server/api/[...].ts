import { useBase, createRouter, defineEventHandler } from 'h3'
import * as projectController from '~/server/controllers/projectsController'
import * as userController from '~/server/controllers/usersController'
import * as projectStatusController from '~/server/controllers/statusController'

const router = createRouter();

/**
Projects
*/
router.post('/projects', defineEventHandler(projectController.createProject))
router.get('/projects/:id', defineEventHandler(projectController.fetchProjectById))
router.get('/projects/user/:id', defineEventHandler(projectController.fetchUserProjects))

/**
Users
*/
router.get('/users/:id', defineEventHandler(userController.fetchUserFromId))

/**
Project Status
*/
router.post('/projects/:id/status/update', defineEventHandler(projectStatusController.updateProjectStatuses))
router.get('/projects/:id/status', defineEventHandler(projectStatusController.fetchStatusForProject))

export default useBase('/api', router.handler)