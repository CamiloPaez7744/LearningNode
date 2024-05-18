import mongoose from "mongoose";



export class Validators {

    static validateMongoId(id: string): boolean {
        return mongoose.isValidObjectId(id);
    }

    static validateEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    static validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    static validateName(name: string): boolean {
        const nameRegex = /^[a-zA-Z]{2,30}$/;
        return nameRegex.test(name);
    }

    static validatePhone(phone: string): boolean {
        const phoneRegex = /^\d{10,11}$/;
        return phoneRegex.test(phone);
    }

    static validateCpf(cpf: string): boolean {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(cpf);
    }

    static validateCnpj(cnpj: string): boolean {
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        return cnpjRegex.test(cnpj);
    }

    static validateZipCode(zipCode: string): boolean {
        const zipCodeRegex = /^\d{5}-\d{3}$/;
        return zipCodeRegex.test(zipCode);
    }

    static validateStreet(street: string): boolean {
        const streetRegex = /^[a-zA-Z0-9\s]{2,50}$/;
        return streetRegex.test(street);
    }

    static validateNumber(number: string): boolean {
        const numberRegex = /^\d{1,5}$/;
        return numberRegex.test(number);
    }

    static validateComplement(complement: string): boolean {
        const complementRegex = /^[a-zA-Z0-9\s]{2,30}$/;
        return complementRegex.test(complement);
    }

    static validateNeighborhood(neighborhood: string): boolean {
        const neighborhoodRegex = /^[a-zA-Z0-9\s]{2,30}$/;
        return neighborhoodRegex.test(neighborhood);
    }

    static validateCity(city: string): boolean {
        const cityRegex = /^[a-zA-Z\s]{2,30}$/;
        return cityRegex.test(city);
    }

    static validateState(state: string): boolean {
        const stateRegex = /^[a-zA-Z]{2}$/;
        return stateRegex.test(state);
    }

    static validateCountry(country: string): boolean {
        const countryRegex = /^[a-zA-Z]{2}$/;
        return countryRegex.test(country);
    }

    static validateProductPrice(price: number): boolean {
        return price > 0;
    }

}