import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('getPokemonById', () => {
    it('should return a pokemon when the id exists', async () => {
        const pokemon = await getPokemonById(1);
        expect(pokemon).toBe('bulbasaur');
    });

    // it('should return an error when the id does not exist', async () => {
    //     try {
    //         await getPokemonById(1000);
    //     } catch (err) {
    //         expect(err.message).toBe('Pokemon no existe');
    //     }
    // });
});