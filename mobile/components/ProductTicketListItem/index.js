import * as React from 'react';
import { ProductCard } from '../ProductCard/index';

const ProductTicketListItem = ({ product, quantity }) => {

    return <ProductCard
        title={product.title}
        description={product.description}
        quantity={quantity}
        unit={product.unit}
        price={product.price}
    />

}

export default ProductTicketListItem