import db from '../config/db.js';

class Todo {
    static async create(todo) {
      const [result] = await db.query('INSERT INTO todos (task) VALUES (?)', [todo.task]);
      return { id: result.insertId, ...todo };
    }
  
    static async getAll() {
      const [rows] = await db.query('SELECT * FROM todos');
      return rows;
    }
  
    static async update(id, todo) {
      await db.query('UPDATE todos SET task = ? WHERE id = ?', [todo.task, id]);
      return { id, ...todo };
    }
  
    static async delete(id) {
      await db.query('DELETE FROM todos WHERE id = ?', [id]);
      return { id };
    }
  }
  
  export default Todo;
  