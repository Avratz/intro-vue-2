//Add a description to the data object with the value "A pair of warm, fuzzy socks".
//Then display the description using an expression in an p element, underneath the h1.

Vue.component('product', {
	props: {
		premium: {
			required: true,
			type: Boolean,
		},
	},
	template: `	
	<div class="product">
		<div class="product-image">
			<img :src="image" />
		</div>

		<div class="product-info">
			<h1>{{ title }}</h1>
			<p v-if="inStock">In Stock</p>
			<p v-else :class="{ outOfStock: !inStock }">Out Of Stock</p>
			<p>Shipping: {{ shipping }}</p>
			<span>{{ sale }}</span>

			<ProductDetails :details="details"></ProductDetails>

			<div
				class="color-box"
				v-for="(variant, index) in variants"
				:key="variant.variantId"
				:style="{backgroundColor: variant.variantColor}"
				@mouseover="updateProduct(index)"
			>
			</div>

			<div class="cart">
				<p>Cart({{ cart }})</p>
				<button
					@click="addToCart"
					:disabled="!inStock"
					:class="{disabledButton: !inStock}"
				>
					Add to cart
				</button>
				<!-- Shortcut to v-on:[event] is @[event]  -->
				<button @click="removeFromCart">Remove from cart</button>
			</div>
		</div>
	</div>`,
	data() {
		return {
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
		}
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
		shipping() {
			if (this.premium) {
				return 'Free'
			} else {
				return '3.99$'
			}
		},
	},
})

Vue.component('ProductDetails', {
	props: {
		details: {
			type: Array,
			required: true,
		},
	},
	template: `
	<ul>
		<li v-for="detail in details">{{ detail }}</li>
	</ul>
	`,
})
let app = new Vue({
	el: '#app',
	data: {
		premium: true,
	},
})
