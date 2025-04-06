// Código em inglês 
import { useState } from "react";

interface Product {
  title: string;
  price: string;
}

const productList = [
  {
    title: 'Macarrão',
    price: 'R$ 25,00'
  },
  {
    title: 'Hamburger',
    price: 'R$ 30,00'
  }
]

export function ListProduct() {
  const [filteredProducts, setfilteredProducts] = useState<Product[]>([])

  function searchProduct(search: string) {
    const filteredBySearch = productList.filter(product => product.title.includes(search))

    setfilteredProducts(filteredBySearch)
  }

  return (
    <div>
      <input type="text" onChange={(e) => searchProduct(e.target.value)} />

      {filteredProducts.map(product => (
        <div>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  )
}


