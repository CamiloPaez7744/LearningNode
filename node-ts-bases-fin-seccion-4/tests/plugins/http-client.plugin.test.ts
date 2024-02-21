import { httpClientPlugin } from '../../src/plugins/http-client.plugin';

describe('httpClientPlugin should return an string', () => {
    it('should return a string', async () => {
        const url = 'https://jsonplaceholder.typicode.com/todos/1';
        const data = await httpClientPlugin.get(url);

        expect(typeof data).toBe('object');
        expect(data.userId).toBe(1);
    });

    it('httpClientPlugin should throw an error', async () => {

        expect(() => {
            throw new Error('Not implemented');
        }).toThrow();

        expect( typeof httpClientPlugin.post ).toBe('function');
        expect( typeof httpClientPlugin.put ).toBe('function');
        expect( typeof httpClientPlugin.delete ).toBe('function');
    });
});
