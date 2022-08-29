const { expectCt } = require('helmet');
const { validateCustomer } = require('../../../models/customer.js');

describe('validate customer', () => {
    it('should have no error if input is correct', () => {
        const { error} = validateCustomer({
            name: "shing",
            isGold: true,
            phone: 65250911
        });
        expect(error).toBe(undefined);
    })
})