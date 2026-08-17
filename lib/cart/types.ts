export type CartItem = { productSlug: string; name: string; brand: string | null; imageUrl: string | null; unitPriceGnf: number; quantity: number; stockQuantity: number; available: boolean; lineTotalGnf: number };
export type Cart = { token: string | null; items: CartItem[]; itemCount: number; subtotalGnf: number };
export type CartActionState = { message?: string; success?: boolean };
