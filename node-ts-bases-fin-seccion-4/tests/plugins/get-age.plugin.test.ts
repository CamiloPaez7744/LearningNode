import { getAge } from '../../src/plugins/get-age.plugin';


describe('getAge', () => {
    it('should return the age of a person', () => {
        const age = getAge('1985-10-21');

        expect( typeof age ).toBe('number');
        expect(age).toBe(39);
    });

    it('should return the current year when the birthdate is the current year', () => {
        const age = getAge(new Date().toISOString().split('T')[0]);

        expect(age).toBe(0);
    });

    it('getAge should return 0 years', () => {
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2024);
        const age = getAge('2024-02-20');

        expect(age).toBe(0);

    });
});