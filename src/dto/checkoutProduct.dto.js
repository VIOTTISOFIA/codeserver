class CheckoutProduct {
  constructor(data) {
    this.price_data = {
      product_data: { name: data.product_id.title },
      currency: "usd",
      //stripe cobra en centavos de dolar!!!
      unit_amount: data.product_id.price * 100,
    };
    this.quantity = data.quantity;
  }
}

export default CheckoutProduct;
