const db = require('../config/db'); 

const Todo = {
  
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM todos');
        return rows;
    },

    
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [id]);
        return rows[0];
    },


    create: async (todoData) => {
        const { title, description, priority } = todoData;
        const [result] = await db.query(
            'INSERT INTO todos (title, description, priority) VALUES (?, ?, ?)',
            [title, description || null, priority || 'középső']
        );
        return { id: result.insertId, ...todoData };
    },


    updatePriority: async (id, priority) => {
        const [result] = await db.query(
            'UPDATE todos SET priority = ? WHERE id = ?',
            [priority, id]
        );
        return result.affectedRows > 0;
    },


    delete: async (id) => {
        const [result] = await db.query('DELETE FROM todos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Todo;