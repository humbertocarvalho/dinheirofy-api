import { Document, Schema, Model, model } from 'mongoose'
import { CustomerInterface } from '../models/Customer'

export interface CustomerModel extends CustomerInterface, Document{};

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export const Customer: Model<CustomerModel> = model<CustomerModel>('Customer', CustomerSchema)
