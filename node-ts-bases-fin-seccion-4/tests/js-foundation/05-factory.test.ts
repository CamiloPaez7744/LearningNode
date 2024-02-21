import { buildMakePerson } from '../../src/js-foundation/05-factory';

describe('buildMakePerson', () => {
    it('should return a function', () => {
        const getUUID = () => '1234';
        const getAge = (birthdate: string) => 35;
        const makePerson = buildMakePerson({ getUUID, getAge });
        expect(typeof makePerson).toBe('function');
    });

    it('should return a person', () => {
        const getUUID = () => '1234';
        const getAge = (birthdate: string) => 35;
        const makePerson = buildMakePerson({ getUUID, getAge });
        const person = makePerson({ name: 'John', birthdate: '1985-10-21' });
        expect(person).toEqual({ id: '1234', name: 'John', birthdate: '1985-10-21', age: 35 });
    });
});

