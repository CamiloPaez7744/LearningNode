import { emailTemplate } from '../../src/js-foundation/01-template';

describe('Testing email template', () => {
    test('should return a template with the name and order id', () => {
        const name = 'Camilo Paez';
        const orderId = '1234';
        const template = emailTemplate.replace('{{name}}', name).replace('{{orderId}}', orderId);
        expect(template).toContain(name);
        expect(template).toContain(orderId);
    });
});