// src/contexts/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Tạo Context
export const CartContext = createContext();

// Tạo Provider Component
export const CartProvider = ({ children }) => {
    // Lấy giỏ hàng từ Local Storage khi khởi tạo
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localCart = localStorage.getItem('cartItems');
            return localCart ? JSON.parse(localCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            return [];
        }
    });

    // Lưu giỏ hàng vào Local Storage mỗi khi cartItems thay đổi
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartItems]);

    // Thêm sản phẩm vào giỏ
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);

            if (existingItem) {
                // Nếu sản phẩm đã có, tăng số lượng
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Nếu sản phẩm chưa có, thêm mới với số lượng là 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    // Tăng số lượng sản phẩm
    const increaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Giảm số lượng sản phẩm
    const decreaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Đảm bảo số lượng không nhỏ hơn 1
                    : item
            )
        ).filter(item => item.quantity > 0); // Xóa khỏi giỏ nếu số lượng giảm xuống 0 (tùy chọn)
    };

    // Tính tổng số lượng sản phẩm trong giỏ (hiển thị trên icon giỏ hàng)
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Tính tổng giá trị giỏ hàng
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                getTotalItems,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Hook tùy chỉnh để dễ dàng sử dụng Context
export const useCart = () => {
    return useContext(CartContext);
};