function cartObject(){
  const cart = new Object();
  cart['sum'] = 0;
  cart['quantity'] = 0;
  return cart
}

//Шапка
function header(title, message=false) {
  let c = '';
  c += cart_dict.line;
  c += cart_dict.n;
  c += title;
  c += cart_dict.n;
  c += cart_dict.line;
  c += cart_dict.n;
  c += message ? message: '';
  return c;
}

//Подвал
function footer(obj){
  let c = '';
  c += cart_dict.line;
  c += cart_dict.n;
  c += cart_dict.total_products + ' ' + obj.quantity + ' ' + cart_dict.unit_of_measurement;
  c += cart_dict.n;
  c += cart_dict.amount + obj.sum + ' ' + cart_dict.currency;
  c += cart_dict.n;
  c += cart_dict.n;
  c += cart_dict.message_basket;
  return c;
}

// Корзина
function basketCart(order, obj) {
  let c = '';
  c += header(cart_dict.your_order);
  c += order;
  c += footer(obj)
  return c;
}

function onlineStore(basket){
  const obj = cartObject();
  let order = '';

  basket.forEach(function(item){
    let total = item.price * item.quantity;
    obj.sum += total;
    obj.quantity += item.quantity;
    order += item.name;
    order += ' '.repeat((20 - (item.name.length + String(item.quantity).length))*2);
    order += item.quantity + ' ' + cart_dict.unit_of_measurement;
    order += ' '.repeat((11 - String(total).length)*2);
    order += total + ' ' + cart_dict.currency;
    order += cart_dict.n;    
  });

  return obj.quantity < 1 ? header(cart_dict.basket_null, cart_dict.message_basket) : basketCart(order, obj);
}

function marketPlace(products){
  let showcase = '';

  showcase += header(cart_dict.market);

  products.forEach(function(item){
    showcase += item.id + ': '
    showcase += item.name;
    showcase += ' '.repeat((10 - item.name.length)*2);
    if (item.quantity > 0){
      showcase += ' '.repeat((8 - String(item.price).length)*2);
      showcase += item.price + ' ' + cart_dict.currency;
      showcase += ' '.repeat(10) + cart_dict.in_stock;
    }else{
      showcase += ' '.repeat(22) + cart_dict.out_of_stock;
    }
    showcase += cart_dict.n;    
  });
  showcase += cart_dict.n;
  showcase += cart_dict.description;
  return showcase;
};

function cart__addProduct(user_input){
  products.forEach(function(el){
    if(el.id === user_input){
      arr = {name: el.name, price: el.price, quantity: 1};      
      basket.push(arr);
      el.quantity -=1;
    }
  });  
};

function valid_product(user_input){
  let a = false;
  if (user_input === '' || user_input === 0){
    a = true;
  }else{
    products.forEach(function(el){
      if(el.id === user_input){
        return el.quantity > 0 ? a = true: alert(el.name + ': ' + cart_dict.out_of_stock);
      };
    });
  }
  return a;
};

const products = [
  {id: 1, name: 'Asus', price: 900, quantity: 1, },
  {id: 2, name: 'Lenovo', price: 1200, quantity: 5, },
  {id: 3, name: 'Epson', price: 300, quantity: 3, },  
];

const basket = [];

const cart_dict ={  
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
}

let next = true;

while(next){
  user_input = +prompt(marketPlace(products));
  let status = valid_product(user_input);
  if (!status){    
     continue;
  }

  if(status && user_input != 0){
    cart__addProduct(user_input)
  }
  
  next = confirm(onlineStore(basket));
};