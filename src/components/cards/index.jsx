// ProductCard.js
import React from 'react';
import './style.css';

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">

                <div className="buttons">
                    <button onClick={() => onAddToCart(product)}>Add to Cart</button>
                    <button onClick={() => onQuickView(product)}>Quick View</button>
                </div>

                <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
                <hr className="divider" />
                <div className="product-bottom">
                    <div className="product-extra">
                        <span className="product-category">Running</span>
                        <span className="product-rating">
                            {Array(5).fill().map((_, index) => (
                                <span key={index} className="star">&#9733;</span>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
