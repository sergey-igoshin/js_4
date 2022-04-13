/*
1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/

function numberObject(user_number) {
  let obj = new Object();

  if (0 <= user_number && user_number <= 999) {
    obj['единицы'] = Math.floor(user_number % 10);
    obj['десятки'] = Math.floor((user_number / 10) % 10);
    obj['сотни'] = Math.floor((user_number / 100) % 10);
    obj['user_number'] = user_number;
  } else {
    console.log('Вы ввели число за диапазоном 0 - 999');
  }

  return obj;
}

let user_number = +prompt('Введите число от 0 до 999');

console.log(numberObject(user_number));
