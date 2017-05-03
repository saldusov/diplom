describe('Проверка стартовой страницы с авторизацией', function() {

  it('Проверим стартовую страницу с авторизацией. Видим форму с 2 полями, заполняем их name=Иван email=ivan@mail.ru и переходим на страницу, где в тэге <account-info> две надписи "Здравствуйте, Иван" и "На вашем счету: 100 GC."', function() {
    browser.get('http://localhost:5000/auth/login/');

    element(by.model('user.name')).sendKeys('Иван');
    element(by.model('user.email')).sendKeys('ivan@mail.ru');

    element(by.css('[type="submit"]')).click();

    let info = element.all(by.css('account-info p'));

    expect(info.get(0).getText()).toEqual('Здравствуйте, Иван');
  });

  it('Проверим страницу авторизации, без авторизации. Введем в форму авторизации неправильный email=ivanmailru и пытаемся отправить форму, должны остаться на странице и получить ошибку', function() {
    browser.get('http://localhost:5000/auth/login/');

    let nameField = element(by.model('user.name'));
    	nameField.sendKeys('Иван');
    let emailField = element(by.model('user.email'));
    	emailField.sendKeys('ivanmailru');

    let errorDiv = emailField.element(by.xpath("..")).element(by.css('div > div'));

    expect(errorDiv.getText()).toEqual('Ваш email должен быть типа example@mail.ru!');
  });
  
});