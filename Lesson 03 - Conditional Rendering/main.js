//Add a description to the data object with the value "A pair of warm, fuzzy socks".
//Then display the description using an expression in an p element, underneath the h1.

let app = new Vue({
	el: '#app',
	data: {
		product: 'Socks',
		image: './assets/vmSocks-green.jpg',
		inStock: true,
		onSale: true,
	},
})