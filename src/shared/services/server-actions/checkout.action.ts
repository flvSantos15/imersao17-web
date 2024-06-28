'use server'

import { redirect } from 'next/navigation'
import { CartServiceFactory } from '@/shared/services/cart.service'
import { OrderServiceFactory } from '@/shared/services/order.service'
import { Order } from '@/shared/models'

export async function checkoutAction(formData: FormData) {
  const cartService = CartServiceFactory.create()
  const cart = cartService.getCart()
  const orderService = OrderServiceFactory.create()
  let order: Order
  try {
    order = await orderService.createOrder({
      card_hash: formData.get('card_hash') as string,
      items: cart.items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity
      }))
    })
    cartService.clearCart()
  } catch (e) {
    console.error(e)
    return {
      error: { message: 'O pagamento não foi aprovado.' }
    }
  }

  redirect(`/checkout/${order.id}/success`)
}
