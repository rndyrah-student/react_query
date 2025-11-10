import React from 'react';

// Gunakan React.memo agar komponen tidak re-render jika props-nya sama
const ProductRow = React.memo(({ product, onAddToCart }) => {
  return (
    <div style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
      <strong>{product.name}</strong> • {product.brand} • {product.category}
      <br />
      <small>Stok: {product.stock}</small>
      <span style={{ float: 'right' }}>
        Rp{product.price.toLocaleString('id-ID')}
        <button
          onClick={() => onAddToCart(product)}
          style={{
            marginLeft: '12px',
            padding: '4px 8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          +
        </button>
      </span>
    </div>
  );
});

export default ProductRow;