import { heroes } from '../data/heroes';

export const findHeroe = (id: number): string => {
    const heroe = heroes.find((heroe) => heroe.id === id);
    if (!heroe) {
        throw new Error(`No existe un héroe con el id ${id}`);
    }
    return heroe.name;
};