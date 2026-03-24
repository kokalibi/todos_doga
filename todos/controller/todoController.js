const Todo = require('../model/todoModel');

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.getAll();
        res.status(200).json(todos); 
    } catch (err) {
        res.status(500).json({ error: "Belső szerverhiba" }); 
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.getById(req.params.id);
        if (!todo) return res.status(404).json({ error: "A teendő nem található" }); 
        res.status(200).json(todo); 
    } catch (err) {
        res.status(500).json({ error: "Adatbázis hiba" }); 
    }
};

exports.createTodo = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Hiányos adatok (title megadása kötelező)" });
    }

    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo); 
    } catch (err) {
        res.status(500).json({ error: "Hiba történt a mentés során" }); 
    }
};

exports.updateTodoPriority = async (req, res) => {
    try {
        const { priority } = req.body;
        const success = await Todo.updatePriority(req.params.id, priority);
        if (!success) return res.status(404).json({ error: "Nincs ilyen ID-vel rendelkező teendő" }); 
        
        const updatedTodo = await Todo.getById(req.params.id);
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: "Hiba az adatbázis művelet során" }); 
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const success = await Todo.delete(req.params.id);
        if (!success) return res.status(404).json({ error: "Nincs ilyen teendő" }); 
        res.status(200).json({ message: "Sikeres törlés" }); 
    } catch (err) {
        res.status(500).json({ error: "Hiba történt a törlés során" }); 
    }
};