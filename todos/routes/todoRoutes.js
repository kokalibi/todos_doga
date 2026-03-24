const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');

router.get('/todos', todoController.getAllTodos);          
router.get('/todos/:id', todoController.getTodoById);      
router.post('/todos', todoController.createTodo);          
router.put('/todos/:id', todoController.updateTodoPriority); 
router.delete('/todos/:id', todoController.deleteTodo);    

module.exports = router;