import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({

    name: { type: String, required: true },
    address: { type: String, required: true }, 
    city: { type: String, required: true },
    country: { type: String, required: true } 
    
});

export interface Customer {
        id: string;
        name: string;
        address: string;
        city: string;
        country: string;
  
}