import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import CheckIcon from '@mui/icons-material/Check'

import { Order, OrderStatus } from '@/shared/models'
import { OrderServiceFactory } from '@/shared/services/order.service'

import { Total } from '@/components/Total'

const order: Order = {
  id: '1',
  items: [
    {
      id: 1,
      product: {
        id: '1',
        name: 'Product 1',
        description: 'Camisa branca',
        price: 100,
        image_url: 'https://source.unsplash.com/random?product',
        category_id: '1'
      },
      quantity: 2,
      price: 100
    }
  ],
  total: 1000,
  status: OrderStatus.PENDING,
  created_at: '27/06/2024'
}

async function CheckoutSuccessPage({
  params
}: {
  params: { orderId: string }
}) {
  const orderService = OrderServiceFactory.create()
  // const order = await orderService.getOrder(params.orderId)
  // console.log(order)
  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <CheckIcon sx={{ color: 'success.main', mr: 2, fontSize: 150 }} />
            </Box>

            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              Pedido realizado com sucesso!
            </Typography>
          </Box>
        </Grid2>

        <Grid2 xs={12} md={6}>
          <Typography variant="h4">Resumo do pedido</Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>

                <TableCell>Qtd.</TableCell>

                <TableCell>Preço</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {order.items.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{item.product.name}</TableCell>

                    <TableCell>{item.quantity}</TableCell>

                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                )
              })}

              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Total total={order.total} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default CheckoutSuccessPage
