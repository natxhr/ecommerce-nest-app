import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from './customer.model';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<Customer>
    ) {}

   async insertCustomer(name: string, address: string, city: string, country: string) {
        const newCustomer = new this.customerModel({
            name, 
            address, 
            city, 
            country
        });
        const result = await newCustomer.save();
        return result.id as string;
    }
    
    async getCustomers() {
        const customers = await this.customerModel.find().exec();
        return customers.map(customer => ({
            id: customer.id,
            name: customer.name,
            address: customer.address,
            city: customer.city,
            country: customer.country
        }));
    }

    async getSingleCustomer(customerId: string) {
        const customer = await this.findCustomer(customerId);
        return {
            id: customer.id,
            name: customer.name,
            address: customer.address,
            city: customer.city,
            country: customer.country
        };
    }

    async updateCustomer(
        customerId: string,
        name: string,
        address: string,
        city: string,
        country: string
    ) {
        const updatedCustomer = await this.findCustomer(customerId);
        if (name) {
            updatedCustomer.name = name;
        }
        if (address) {
            updatedCustomer.address = address;
        }
        if (city) {
            updatedCustomer.city = city;
        }
        if (country) {
            updatedCustomer.country = country;
        }
        updatedCustomer.save();
    }

    async deleteCustomer(customerId: string) {
        const result = await this.customerModel.deleteOne({ _id: customerId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find customer.');
        }
    }
    

    private async findCustomer(id: string): Promise<Customer> {
        let customer: Customer | PromiseLike<Customer>;
        try {
            customer = await this.customerModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find customer.');
        }
        if (!customer) {
            throw new NotFoundException('Could not find customer.');
        }
        return customer;
    }
}
