import { authService } from '../services/authService.js';
import { productService } from '../services/productService.js';
import { orderService } from '../services/orderService.js';
import { userService } from '../services/userService.js';

export const resolvers = {
    Query: {
        products: productService.getAllProducts,
        orderHistory: orderService.getOrderHistory,
        users: userService.getAllUsers,
        user: userService.getUser,
    },
    Mutation: {
        signUp: authService.signUp,
        login: authService.login,
        addProduct: productService.addProduct,
        addToCart: orderService.addToCart,
    },
};
