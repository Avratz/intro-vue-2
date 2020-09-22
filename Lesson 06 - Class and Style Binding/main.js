//Add a description to the data object with the value "A pair of warm, fuzzy socks".
//Then display the description using an expression in an p element, underneath the h1.

let app = new Vue({
	el: '#app',
	data: {
		product: 'Socks',
		image: './assets/vmSocks-green.jpg',
		inStock: false,
		onSale: true,
		details: ['80% cotton', '20% polyester', 'Gender-neutral'],
		variants: [
			{
				variantId: 2234,
				variantColor: 'green',
				variantImage: './assets/vmSocks-green.jpg',
			},
			{
				variantId: 2235,
				variantColor: 'blue',
				variantImage: './assets/vmSocks-blue.jpg',
			},
		],
		cart: 0,
	},
	methods: {
		addToCart() {
			this.cart++
		},
		removeFromCart() {
			if (this.cart === 0) {
				return
			}
			this.cart--
		},
		updateProduct(variantImage) {
			this.image = variantImage
		},
	},
})
