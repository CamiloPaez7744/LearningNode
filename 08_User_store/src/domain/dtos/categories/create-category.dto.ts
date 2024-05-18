


export class CreateCategoryDto {
  
    private constructor(
        public readonly name: string,
        public readonly available: string,
        public readonly description: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, CreateCategoryDto?] {
        const { name, available, description } = object;

        if (!name) return ['Name is required'];
        if (typeof available !== 'boolean') available === 'true' ? true : false;
        if (!available) return ['Available is required'];

        return [undefined, new CreateCategoryDto(name, available, description)];
    }
}