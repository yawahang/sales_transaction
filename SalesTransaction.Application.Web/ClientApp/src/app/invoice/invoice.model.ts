export interface MvInvoice {
    invoiceId: number;
    invoiceNumber: string;
    invoiceAmount: number;
    customer: string;
    invoiceDetail: MvInvoiceDetail[];
}

export interface MvInvoiceDetail {
    salesId: number;
    product: string;
    quantity: number;
    rate: number;
    total: number;
}
