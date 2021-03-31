export default {
    namespaced: true,
    // this store state has three variables
    state() {
        return {
            items: [],
            total: 0,
            qty: 0
        }
    },
    // a mutation is an event that can change the state 
    // each mutation has a string type and a handler
    mutations: {
        // this handler function accepts a payload and has access to the state
        addProductToCart(state, payload) {
            const productData = payload;
            const productInCartIndex = state.items.findIndex(
                (ci) => ci.productId === productData.id
            );

            if (productInCartIndex >= 0) {
                state.items[productInCartIndex].qty++;
            } else {
                const newItem = {
                    productId: productData.id,
                    title: productData.title,
                    image: productData.image,
                    price: productData.price,
                    qty: 1,
                };
                state.items.push(newItem);
            }
            state.qty++;
            state.total += productData.price;
        },

        removeProductFromCart(state, payload) {
            const prodId = payload.productId
            const productInCartIndex = state.items.findIndex(
                (cartItem) => cartItem.productId === prodId
            );
            const prodData = state.items[productInCartIndex];
            state.items.splice(productInCartIndex, 1);
            state.qty -= prodData.qty;
            state.total -= prodData.price * prodData.qty;
        },
    },
    // the only way to change state is by committing a mutation
    // actions have a context and can accept a payload
    actions: {
        addToCart(context, payload) {
            const productId = payload.id
            // through the context we can access the root store
            // thus we can also access other stores 
            const products = context.rootGetters['prods/products']
            const product = products.find(prod => prod.id === productId);

            // commit
            context.commit('addProductToCart', product)


        },
        removeFromCart(context, payload) {
            context.commit('removeProductFromCart', payload)
        }
    },
    // getters are responsible for observing the variables in the store and provide it to the application
    getters: {
        cartItems(state) {
            return state.items;
        },
        cartTotal(state) {
            return state.total;
        },
        cartQty(state) {
            return state.qty;
        }
    }
}