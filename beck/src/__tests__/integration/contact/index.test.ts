import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../../app';
import AppDataSource from '../../../data-source';
import {
  mockedContact,
  mockedSecondUser,
  mockedSecondUserLogin,
  mockedUser,
  mockedUserLogin,
} from '../../mocks';

describe('/contact', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    await request(app).post('/user').send(mockedUser);
    await request(app).post('/user').send(mockedSecondUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /contact - should be able to create a contact', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const response = await request(app)
      .post('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedContact);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('completeName');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('tellphone');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('secondTellphone');
    expect(response.body).toHaveProperty('secondEmail');
    expect(response.body).toHaveProperty('owner');
    expect(response.body.owner.completeName).toBe(mockedUser.completeName);
    expect(response.status).toBe(201);
  });

  test('POST /contact - should not be able to create a contact with a void content', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const response = await request(app)
      .post('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`)
      .send({});

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /contact - should not be able to create a contact from another user', async () => {
    const secondUserCreation = await request(app)
      .post('/users')
      .send(mockedSecondUser);

    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const response = await request(app)
      .post('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`)
      .send({
        completeName: 'Catarina Souza',
        email: 'katarian@mail.com',
        tellphone: '(85)33333-3333',
        owner: secondUserCreation.body,
      });

    expect(response.body.owner.completeName).toBe(mockedUser.completeName);
    expect(response.body.owner.email).toBe(mockedUser.email);
    expect(response.status).toBe(201);
  });

  test('POST /contact - should not be able to create a contact without authorization', async () => {
    const response = await request(app).post('/contact').send({
      content: 'Passear com o gato.',
    });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /contact - should be able to list all contact from current user', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    await request(app)
      .post('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedContact);

    const response = await request(app)
      .get('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body.length >= 1).toBe(true);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('completeName');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('tellphone');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');
    expect(response.body[0]).toHaveProperty('secondTellphone');
    expect(response.body[0]).toHaveProperty('secondEmail');
    expect(response.body[0].completeName).toBe(mockedContact.completeName);
    expect(response.status).toBe(200);
  });

  test('GET /contact - should not be able to list all contacts without authorization', async () => {
    const response = await request(app).get('/contact');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /contact/:id - should be able to retrieve one contact', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const contactSearch = await request(app)
      .get('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .get(`/contact/${contactSearch.body[0].id}`)
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('completeName');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('tellphone');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('secondTellphone');
    expect(response.body).toHaveProperty('secondEmail');
    expect(response.body).toHaveProperty('owner');
    expect(response.body.completeName).toBe(mockedContact.completeName);
    expect(response.status).toBe(200);
  });

  test('GET /contact/:id - should not be able to retrieve a contact without owner permission', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const secondUserLoginResponse = await request(app)
      .post('/login')
      .send(mockedSecondUserLogin);

    const firstUserContactSearch = await request(app)
      .get('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .get(`/contact/${firstUserContactSearch.body[0].id}`)
      .set('authorization', `Bearer ${secondUserLoginResponse.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /contact/:id - should not be able to retrieve one contact with invalid id', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const response = await request(app)
      .get('/contact/478ef6cf-d849-49c3-b3cb-7d9cf51d758d')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('GET /contact/:id - should not be able to retrieve one contact without authorization', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const contactSearch = await request(app)
      .get('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app).get(
      `/contact/${contactSearch.body[0].id}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /contact/:id - should be able to update a contact', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const contactSearch = await request(app)
      .get('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/contact/${contactSearch.body[0].id}`)
      .send({
        secondEmail: 'test@mail.com.br',
      })
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('completeName');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('tellphone');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('secondTellphone');
    expect(response.body).toHaveProperty('secondEmail');
    expect(response.body.secondEmail).toBe('test@mail.com.br');
    expect(response.body.owner.completeName).toBe(mockedUser.completeName);
    expect(response.status).toBe(200);
  });

  test('PATCH /contact/:id - should not be able to update one contact without authorization', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const contactSearch = await request(app)
      .get('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/contact/${contactSearch.body[0].id}`)
      .send({
        secondTellphone: '(77)12345-6648',
      });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /contact/:id - should not be able to update a contact without owner permission', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const secondUserLoginResponse = await request(app)
      .post('/login')
      .send(mockedSecondUserLogin);

    const firstUserContactSearch = await request(app)
      .get('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/contact/${firstUserContactSearch.body[0].id}`)
      .send({ completeName: 'João Paulo Barros' })
      .set('authorization', `Bearer ${secondUserLoginResponse.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /contact/:id - should be able to delete a contact', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const contactSearch = await request(app)
      .get('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/contact/${contactSearch.body[0].id}`)
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    const deletedContactSearch = await request(app)
      .get(`/contact/${contactSearch.body[0].id}`)
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(deletedContactSearch.body).toHaveProperty('message');
    expect(deletedContactSearch.status).toBe(404);
  });

  test('DELETE /contact/:id - should not be able to delete a contact without authorization', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const contactCreation = await request(app)
      .post('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedContact);

    const response = await request(app).delete(
      `/contact/${contactCreation.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /contact/:id - should not be able to delete a contact without owner permission', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const secondUserLoginResponse = await request(app)
      .post('/login')
      .send(mockedSecondUserLogin);

    const contactSearch = await request(app)
      .get('/contact')
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/contact/${contactSearch.body[0].id}`)
      .set('authorization', `Bearer ${secondUserLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /contact/:id - should not be able to delete a contact with invalid ID', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/contact/df8a9e47-9df0-4a2b-bc94-908f89936644`)
      .set('authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
