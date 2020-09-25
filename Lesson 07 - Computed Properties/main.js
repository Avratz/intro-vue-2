//Add a description to the data object with the value "A pair of warm, fuzzy socks".
//Then display the description using an expression in an p element, underneath the h1.

let app = new Vue({
	el: '#app',
	data: {
		product: 'Socks',
		brand: 'Vue Mastery',
		selectedVariants: 0,
		details: ['80% cotton', '20% polyester', 'Gender-neutral'],
		onSale: true,
		variants: [
			{
				variantId: 2234,
				variantColor: 'green',
				variantImage: './assets/vmSocks-green.jpg',
				variantQuantity: 20,
			},
			{
				variantId: 2235,
				variantColor: 'blue',
				variantImage: './assets/vmSocks-blue.jpg',
				variantQuantity: 0,
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
		updateProduct(index) {
			this.selectedVariants = index
		},
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product
		},
		image() {
			return this.variants[this.selectedVariants].variantImage
		},
		inStock() {
			return this.variants[this.selectedVariants].variantQuantity
		},
		sale() {
			if (this.onSale) {
				return this.brand + ' ' + this.product + ' is on sale'
			} else {
				return this.brand + ' ' + this.product + ' is not on sale'
			}
		},
	},
})
