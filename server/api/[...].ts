import { useBase, createRouter, defineEventHandler } from 'h3'
import * as projectController from '~/server/controllers/projectsController'
import * as userController from '~/server/controllers/usersController'
import * as projectStatusController from '~/server/controllers/statusController'
import * as taskControler from '~/server/controllers/taskController'
import * as categoryController from '@/server/controllers/categoryController'

const router = createRouter();

/**
Projects
*/
router.post('/projects', defineEventHandler(projectController.createProject))
router.get('/projects/:id', defineEventHandler(projectController.fetchProjectById))
router.get('/projects/user/:id', defineEventHandler(projectController.fetchUserProjects))
router.post('/projects/:id', defineEventHandler(projectController.updateProjectName))

/**
Users
*/
router.get('/users/:id', defineEventHandler(userController.fetchUserFromId))

/**
Project Status
*/
router.post('/projects/:id/status/update', defineEventHandler(projectStatusController.updateProjectStatuses))
router.get('/projects/:id/status', defineEventHandler(projectStatusController.fetchStatusForProject))
router.patch('/status/:id', defineEventHandler(projectStatusController.updateStatus))

/**
Tasks
*/
router.post('/projects/:id/task/quick-task', defineEventHandler(taskControler.createQuickTask))
router.post('/projects/:id/task/update-tasks-status', defineEventHandler(taskControler.updateTaskStatus))
router.post('/task/:id', defineEventHandler(taskControler.updateTaskDetails))
router.delete('/task/:id', defineEventHandler(taskControler.deleteTask))

/**
Categories
*/
router.get('/task/:id/categories', defineEventHandler(categoryController.fetchTaskCategories))

export default useBase('/api', router.handler)