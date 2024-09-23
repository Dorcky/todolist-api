import request from 'supertest';
import app from '../app.js';
import db from '../config/db.js'; // Assurez-vous que ce chemin est correct

describe('Todo API', () => {
  let todoId;

  afterAll(async () => {
    await db.end(); // Ferme la connexion à la base de données
  });

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ task: 'Learn Node.js' });
    todoId = res.body.id;
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.task).toEqual('Learn Node.js');
  });

  it('should fetch all todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should update a todo', async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ task: 'Learn Node.js and Express' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.task).toEqual('Learn Node.js and Express');
  });

  it('should delete a todo', async () => {
    const res = await request(app).delete(`/api/todos/${todoId}`);
    expect(res.statusCode).toEqual(204);
  });
});
