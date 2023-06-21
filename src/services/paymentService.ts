import { Customer, Order } from "@prisma/client"

import { PaymentData } from "../interfaces/PaymentData"

import { api } from "../lib/api"

export default class PaymentService {
  async process(order: Order, customer: Customer, payment: PaymentData) {
    // TODO: criar o customer
    const customerId = await this.createCustomer(customer)
    console.log("customerId", customerId)

    // TODO: processar a transação
  }

  private async createCustomer(customer: Customer): Promise<string> {
    const customerResponse = await api.get(`/customers?email=${customer.email}`)

    if (customerResponse.data?.data?.length > 0) {
      return customerResponse.data?.data[0]?.id
    }

    const customerParams = {
      name: customer.fullName,
      email: customer.email,
      mobilePhone: customer.mobile,
      cpfCnpj: customer.document,
      postalCode: customer.zipCode,
      address: customer.street,
      addressNumber: customer.number,
      complement: customer.complement,
      province: customer.neighborhood,
      notificationDisabled: true,
    }

    const response = await api.post("/customers", customerParams)

    return response.data?.id
  }
}
