import React from 'react'
import Link from 'next/link'

import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import DeleteIcon from '@mui/icons-material/Delete'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { CartServiceFactory } from '@/shared/services/cart.service'
import { ProductService } from '@/shared/services/product.service'
import { removeItemFromCartAction } from '@/shared/services/server-actions/cart.action'

import { Total } from '@/components/Total'

const products = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Camisa branca',
    price: 100,
    image_url: 'https://source.unsplash.com/random?product',
    category_id: '1'
  },
  {
    id: '2',
    name: 'Calça',
    description: 'Calça jeans',
    price: 100,
    image_url: 'https://source.unsplash.com/random?product',
    category_id: '1'
  }
]

const cart = {
  items: [
    {
      product_id: '1',
      quantity: 2,
      total: 200
    },
    {
      product_id: '2',
      quantity: 1,
      total: 100
    }
  ],
  total: 1000
}

async function MyCartPage() {
  // const cart = CartServiceFactory.create().getCart()
  const productService = new ProductService()
  // const products = await productService.getProductsByIds(
  //   cart.items.map((item) => item.product_id)
  // )
  return (
    <Box>
      <Typography variant="h3">
        <ShoppingCartIcon /> Meu carrinho
      </Typography>

      <Grid2 container>
        <Grid2 xs={10} sm={7} md={4}>
          <List>
            {cart.items.map((item, index) => {
              const product = products.find(
                (product) => product.id == item.product_id //usar ===
              )!

              return (
                <React.Fragment key={index}>
                  <ListItem
                    sx={{ display: 'flex', alignItems: 'flex-start', mt: 3 }}
                  >
                    <ListItemAvatar>
                      <Avatar src={product.image_url} />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography variant="button">
                            {product.name} - Qtd. {item.quantity}
                          </Typography>

                          <Typography sx={{ color: 'primary.main' }}>
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(item.total)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>

                  <ListItem
                    sx={{ display: 'flex', justifyContent: 'end', p: 0 }}
                  >
                    <form action={removeItemFromCartAction}>
                      <input type="hidden" name="index" value={index} />

                      <Button
                        color="error"
                        startIcon={<DeleteIcon />}
                        type="submit"
                      >
                        Excluir
                      </Button>
                    </form>
                  </ListItem>

                  <Divider variant="inset" component="li" sx={{ ml: 0 }} />
                </React.Fragment>
              )
            })}

            {!cart.items.length && (
              <ListItem>
                <ListItemText>Nenhum item no carrinho</ListItemText>
              </ListItem>
            )}
          </List>

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Total total={cart.total} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            {cart.items.length ? (
              <Button LinkComponent={Link} href="/checkout">
                Finalizar compra
              </Button>
            ) : (
              <Button LinkComponent={Link} href="/products">
                Continuar comprando
              </Button>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default MyCartPage
