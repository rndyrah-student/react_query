import React, { useState, useEffect, useRef } from 'react';
import ProductRow from './ProductRow';

const ProductList = ({ filteredProducts, onAddToCart }) => {
  const [visibleItems, setVisibleItems] = useState(20);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleItems((prev) => Math.min(prev + 20, filteredProducts.length));
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [filteredProducts.length]);

  if (!filteredProducts || filteredProducts.length === 0) {
    return <div className="p-4 text-gray-500">Tidak ada produk ditemukan.</div>;
  }

  return (
    <div className="space-y-2">
      {filteredProducts.slice(0, visibleItems).map((product) => (
        <ProductRow
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
      {visibleItems < filteredProducts.length && (
        <div ref={observerTarget} className="h-10 flex items-center justify-center">
          <span className="text-gray-400">Loading more...</span>
        </div>
      )}
    </div>
  );
};

export default ProductList;