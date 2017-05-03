const UserSchema = require('../api/v1/users/User.schema');
UserSchema.remove({}, (err) => done());

describe('Проверка добавления заказов', function() {

  it('Переходим на главную страницу, ищем кнопку с классом "add-order-button" и кликаем на неё. Видим список товаров. 2 раза пополняем счет. Кликаем на кнопку купить у двух первых товаров и переходим обратно к заказам. Проверяем что добавилось 2 товара.', function() {
    browser.get('http://localhost:5000/');

    element(by.model('user.name')).sendKeys('Иван');
    element(by.model('user.email')).sendKeys('ivan@mail.ru');

    element(by.css('[type="submit"]')).click();

    element(by.buttonText('Пополнить')).click();
    element(by.buttonText('Пополнить')).click();

    let orderList = element.all(by.repeater('order in $ctrl.orders'));
    var startOrders = 0;
    
    orderList.count().then((count) => {
      startOrders = count
      element(by.css('.add-order-button')).click();

      let dishesList = element.all(by.repeater('dish in $ctrl.dishes'));

      dishesList.get(0).element(by.tagName('button')).click();
      dishesList.get(1).element(by.tagName('button')).click();

      element(by.css('[ui-sref]')).click();

      expect(orderList.count()).toEqual(startOrders + 2);
    });
    
  });
  
});