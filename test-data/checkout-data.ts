// Define the structure of each test case
export interface BillingAddressData {
    country: string,
    city: string,
    address1: string,
    zipCode: string,
    phoneNumber: string
}
// Export the data as an array of objects
export const billingAddressData: BillingAddressData[] = [
    {
    country: 'Serbia',
    city: 'Belgrade',
    address1: 'Knez Mihailova 1',
    zipCode: '11000',
    phoneNumber: '060123456'
    },
]
