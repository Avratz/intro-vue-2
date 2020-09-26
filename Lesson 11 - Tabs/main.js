//Add a description to the data object with the value "A pair of warm, fuzzy socks".
//Then display the description using an expression in an p element, underneath the h1.
const eventBus = new Vue()
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

			<ProductTabs :shipping="shipping" :inStock="inStock"></ProductTabs>

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
		<ReviewTabs :reviews="reviews"></ReviewTabs>
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
			reviews: [],
		}
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariants].variantId)
		},
		removeFromCart() {
			this.$emit(
				'remove-from-cart',
				this.variants[this.selectedVariants].variantId
			)
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
	mounted() {
		eventBus.$on('form-submited', (review) => {
			this.reviews.push(review)
		})
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

Vue.component('ProductReview', {
	template: `
	<form class="review-form" @submit.prevent="onSubmit">
	${
		'' /* @submit.prevent -> the .prevent modifier, its event.preventDefault()  */
	}
		<p v-show="errors.length">
			<b>Please correct the following error(s):</b>
			<ul>
				<li v-for="error in errors">{{ error }}</li>
			</ul>
		</p>
		<p>
			<label for="name">Name:</label>
			<input id="name" v-model="name" placeholder="name">
		</p>
		
		<p>
			<label for="review">Review:</label>      
			<textarea id="review" v-model="review"></textarea>
		</p>
		
		<p>
			<label for="rating">Rating:</label>
			<select id="rating" v-model.number="rating"> 
			${
				'' /* v-model.number transform the input in to number like Number(this.myNumber) */
			}
				<option>5</option>
				<option>4</option>
				<option>3</option>
				<option>2</option>
				<option>1</option>
			</select>
		</p>
		<p>

		<fieldset>
			<legend>Would you recommend this product:</legend>
			<label>
			<input type="radio" id="yes" name="recommend" value="yes" v-model="recommend">
			Yes
			</label>
			<label>
			<input type="radio" id="no" name="recommend" value="no" v-model="recommend">
			No</label>
		</fieldset>
		</p>
				
		<p>
			<input type="submit" value="Submit">  
		</p>    

	</form>
	`,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			recommend: null,
			errors: [],
		}
	},
	methods: {
		onSubmit() {
			this.errors = [] // clean errors if any
			if (this.name && this.review && this.rating && this.recommend) {
				const formData = {
					name: this.name,
					text: this.review,
					rating: this.rating,
					recommend: this.recommend,
				}
				eventBus.$emit('form-submited', formData)
				this.name = null
				this.review = null
				this.rating = null
				this.recommend = null
			} else {
				if (!this.name) this.errors.push('Name is Required.')
				if (!this.review) this.errors.push('Review is Required.')
				if (!this.rating) this.errors.push('Rating is Required.')
				if (!this.recommend)
					this.errors.push('Recommendation field is Required.')
			}
		},
	},
})

Vue.component('ReviewTabs', {
	props: {
		reviews: {
			required: true,
			type: Array,
		},
	},
	template: `
	<div>
		<span v-for="(tab, index) in tabs" :key="index" @click="selectedTab = tab" class="tab" :class="{activeTab: selectedTab === tab}">{{ tab }}</span>
		<div v-show="selectedTab === 'Reviews'">
			<h2>Reviews:</h2>
			<p v-if="!reviews.length">There is no review at the moment.</p>
			<ul v-else>
			<li v-for="review in reviews"> 
				<p>Name: {{ review.name }}</p>
				<p>Rating: {{ review.rating }}</p>
				<p>Review: {{ review.text }}</p>
				<p>Recommend: {{ review.recommend }}</p>
			</li>
			</ul>
		</div>
		

		<ProductReview v-show="selectedTab === 'Make a review'"></ProductReview>
	</div>
	`,
	data() {
		return {
			tabs: ['Reviews', 'Make a review'],
			selectedTab: 'Reviews',
		}
	},
})

Vue.component('ProductTabs', {
	props: {
		shipping: {
			required: true,
			type: String,
		},
		inStock: {
			required: true,
			type: Number,
		},
	},
	template: `
	<div>
	<span class="tab" v-for="(tab, index) in tabs" :key="index" :class="{activeTab: tab === selectedTab}" @click="selectedTab = tab">{{ tab }}</span>
	<div v-show="selectedTab === 'Stock'">
		<p v-if="inStock">In Stock</p>
		<p v-else :class="{ outOfStock: !inStock }">Out Of Stock</p>
	</div>
		<p v-show="selectedTab === 'Shipping'">Shipping: {{ shipping }}</p>
	</div>
	`,
	data() {
		return {
			tabs: ['Stock', 'Shipping'],
			selectedTab: 'Stock',
		}
	},
})

let app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: [],
	},
	methods: {
		addToCart(id) {
			this.cart.push(id)
		},
		removeFromCart(id) {
			this.cart = this.cart.filter((item) => item !== id)
		},
	},
})
