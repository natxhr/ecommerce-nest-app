import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';

import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}
    
    @Post()
    async addCustomer(
        @Body('name') customerName: string,
        @Body('address') customerAddress: string,
        @Body('city') customerCity: string,
        @Body('country') customerCountry: string
    ) {
        const generatedId = this.customersService.insertCustomer(
            customerName,
            customerAddress,
            customerCity,
            customerCountry
        );
        return { id: generatedId };
    }

    @Get()
    async getAllCustomers() {
        const customers = await this.customersService.getCustomers();
        return customers;
    }

    @Get(':id')
    async getCustomer(@Param('id') customerId: string) {
        return this.customersService.getSingleCustomer(customerId);
    }

    @Patch(':id')
    async updateCustomer(
        @Param('id') customerId: string,
        @Body('name') customerName: string,
        @Body('address') customerAddress: string,
        @Body('city') customerCity: string,
        @Body('country') customerCountry: string
    ) {
        await this.customersService.updateCustomer(
            customerId,
            customerName,
            customerAddress,
            customerCity,
            customerCountry
        );
        return null;
    }

    @Delete(':id')
    async removeCustomer(@Param('id') customerId: string) {
        await this.customersService.deleteCustomer(customerId);
        return null;
    }
}