const request = require('supertest');
let server;


describe('/api/users', () => {
    beforeEach(() => { server = require('../../index.js') })
    afterEach(() => { server.close() });

    describe('GET /', () => {
        it('should return 401 with the absence of token', async () => {
            const res = await request(server).get('/api/users');
            expect(res.status).toBe(401);
            expect(res.body).toContain('Invalid Token!');
        });
        it('should return 401 with invalid token', async () => {
            
        })
        it('should not get any users if the user is not Admin', async () => {
            const res = await request(server).get('/api/users').auth('wangsheng1999@outlook.com', 'yijijun33');
            expect(res.status).toBe(403);
        });
        it('should not get the specific user if the user is not Admin or himself/herself', async () => {

        })
    })
});