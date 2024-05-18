import { Validators } from "../../../config";



export class CreateProductDto {
  
    private constructor(
        public readonly name: string,
        public readonly price: number,
        public readonly available: boolean,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, CreateProductDto?] {
        const { name, price, available, description, user, category } = object;
        let availableParsed: boolean = false;
        if (!name) return ['Name is required'];
        if (!price) return ['Price is required'];
        if (available === undefined) {
            availableParsed = true;
        } else {
            if (typeof available !== 'boolean') available === 'true' ? availableParsed = true : availableParsed = false;
        }
        if (!user) return ['User is required'];
        if (!Validators.validateMongoId(user)) return ['User is invalid'];
        if (!category) return ['Category is required'];
        if (!Validators.validateMongoId(category)) return ['Category is invalid'];

        return [undefined, new CreateProductDto(name, price, availableParsed, description, user, category)];
    }
}