const { Customer } = require('../../models/customer.js');
const request = require('supertest');

let server;

describe('/api/customers', () => {
    beforeEach(() => { server = require('../../index.js'); })
    afterEach(async () => { 
        server.close(); 
        await Customer.deleteMany({});
    });
    describe('GET /', () => {
        it('should return all customers', async () => {
            const res = await request(server).get('/api/customers');
            expect(200);
        });
        it('should return a customer if valid name and phone is passed', async () => {
            const customer = new Customer({ name: 'shing', phone: '65250911' });
            await customer.save();

            const res = request(server).get('/api/customers/' + customer.name + '&' + customer.phone);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty(['name', customer.name]);
        })
    })
})