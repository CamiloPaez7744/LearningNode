import { getUUID } from '../../src/plugins/get-id.plugin';

describe('getUUID', () => {
    it('should return a UUID', () => {
        const uuid = getUUID();

        expect(typeof uuid).toBe('string');
        expect(uuid.length).toBe(36);
    });
});