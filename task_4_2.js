/*
2.Продолжить работу с интернет-магазином:
2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
2.2. Реализуйте такие объекты.
2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
*/

const init = {
  main(){
    let next = true;  
    while(next){
      let user_input = +prompt(this.marketPlace(this.products, this.cart_dict));
      let status = this.validate(user_input, this.cart_dict);
      if (!status){    
        continue;
      }  
      if(status && user_input != 0){
        this.cart__addProduct(user_input, this.basket)
      }    
      next = confirm(this.onlineStore(this.basket, this.cart_dict));
    };
  },
  validate(t, o){
    let a = false;
    if (t === '' || t === 0){
      a = true;
    }else{
      this.products.forEach(function(el){
        if(el.id === t){
          return el.quantity > 0 ? a = true: alert(el.name + ': ' + o.out_of_stock);
        };
      });
    }
    return a;
  },
  cart__addProduct(t, b){
    this.products.forEach(function(el){
      if(el.id === t){
        arr = {name: el.name, price: el.price, quantity: 1};      
        b.push(arr);
        el.quantity -=1;
      }
    });  
  },
  marketPlace(p, t){
    let showcase = '';  
    showcase += this.header(t.market, t);  
    p.forEach(function(item){
      showcase += item.id + ': '
      showcase += item.name;
      showcase += ' '.repeat((10 - item.name.length)*2);
      if (item.quantity > 0){
        showcase += ' '.repeat((8 - String(item.price).length)*2);
        showcase += item.price + ' ' + t.currency;
        showcase += ' '.repeat(10) + t.in_stock;
      }else{
        showcase += ' '.repeat(22) + t.out_of_stock;
      }
      showcase += t.n;    
    });
    showcase += t.n;
    showcase += t.description;
    return showcase;
  },
  onlineStore(b, t){
    const obj = this.cartObject();
    let order = '';  
    b.forEach(function(item){
      let total = item.price * item.quantity;
      obj.sum += total;
      obj.quantity += item.quantity;
      order += item.name;
      order += ' '.repeat((20 - (item.name.length + String(item.quantity).length))*2);
      order += item.quantity + ' ' + t.unit_of_measurement;
      order += ' '.repeat((11 - String(total).length)*2);
      order += total + ' ' + t.currency;
      order += t.n;    
    });  
    return obj.quantity < 1 ? this.header(t.basket_null, t, t.message_basket) : this.basketCart(order, obj, t);
  },
  basketCart(order, obj, t) {
    let c = '';
    c += this.header(t.your_order, t);
    c += order;
    c += this.footer(obj, t)
    return c;
  },
  footer(obj, t){
    let c = '';
    c += t.line;
    c += t.n;
    c += t.total_products + ' ' + obj.quantity + ' ' + t.unit_of_measurement;
    c += t.n;
    c += t.amount + obj.sum + ' ' + t.currency;
    c += t.n;
    c += t.n;
    c += t.message_basket;
    return c;
  },
  header(o, t, m=false) {
    let c = '';
    c += t.line;
    c += t.n;
    c += o;
    c += t.n;
    c += t.line;
    c += t.n;
    c += m ? m: '';
    return c;
  },
  cartObject(){
    const cart = new Object();
    cart['sum'] = 0;
    cart['quantity'] = 0;
    return cart
  },  
  cart_dict: {  
    line: '*'.repeat(46),
    n: '\n', 
    basket_null: 'Корзина пустая',
    your_order: 'Ваш заказ',
    total_products: 'Всего товаров: ',
    amount: 'На сумму: ',
    in_stock: 'в наличии',
    out_of_stock: 'нет в наличии',
    currency: '₽',
    unit_of_measurement: 'шт',
    market: 'МВидео',
    description: 'Укажите номер товара и нажмите "ОК", \nдля завершения "Отмена"',
    message_basket: 'Продолжить покупки - нажмите "ОК", \nдля завершения "Отмена"',  
  },
  basket: [    
  ],
  products: [
    {id: 1, name: 'Asus', price: 900, quantity: 1, },
    {id: 2, name: 'Lenovo', price: 1200, quantity: 5, },
    {id: 3, name: 'Epson', price: 300, quantity: 2, },  
  ],
}

init.main();