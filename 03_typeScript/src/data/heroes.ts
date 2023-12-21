interface Hero {
    id: number;
    name: string;
    age: number;
    powers: string[];
}

export const heroes: Hero[] = [
    {
        id: 1,
        name: 'Ironman',
        age: 45,
        powers: ['Volar', 'Lanzar misiles', 'Disparar láser'],
    },
    {
        id: 2,
        name: 'Spiderman',
        age: 17,
        powers: ['Sentido arácnido', 'Telas de araña', 'Trepar paredes'],
    },
    {
        id: 3,
        name: 'Thor',
        age: 1500,
        powers: ['Fuerza', 'Rayos', 'Volar'],
    },
];