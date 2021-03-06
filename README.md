# Drone cafe [Demo-версия](https://fast-waters-79646.herokuapp.com)

В рамках дипломного проект была разработана система автоматизации ресторана, в котором вместо официантов используются автономные дроны, а заказ размещается через простое веб-приложение.

## Системе выполнена на

* Сервер реализуется на Node.js с использованием express.js
* Взаимодействие клиента и сервера в реальном времени реализовать с использованием socket.io
* Интерфейс системы построен на фреймворке AngularJS
* Для хранения блюд, заказов и их состояний использовуется база данных MongoDB
* В качестве CSS фреймворка использовать [AngularJS Material](https://material.angularjs.org)
* Ключевые части системы покрыты тестами c использованием mocha, chai, protractor.

## Описание системы

В системе автоматизации два основных интерфейса:

1. Интерфейс клиента, в котором можно оформить заказ и отслеживать его состояние. Открывается на главной странице (`/`)
2. Интерфейс повара, в котором отображаются заказанные блюда и есть возможность стартовать приготовление блюда и отмечать его готовность. Открывается по адресу `/kitchen`

## Описание интерфейсов

Клиент может:
1. Пополнить счет.
2. Добавить блюдо к заказу.
3. Видеть список заказанных блюд и их состояние.

Повар может:
1. Сменить состояние заказа на "готовится".
2. Сменить состояние заказа на "доставляется".

## Архитектура системы
Реализованные модули:
1. dishes - получается список блюд из исходного файла menu.json
2. users - имеет механизм авторизации клиентов, поиска клиента по идентификатору и обновления информации о клиенте
3. orders - иммет механизмы:
3.1. получения полного списка заказов с возможностью фильтрации по посетителям и статусу заказа;
3.2. получения информации об одном заказе
3.3. добавления заказа
3.4. обновления заказа
3.5. обновления статуса заказа
3.5.1. при обновлении статуса предусмотренно использование стороннего модуля "netology-fake-drone-api" для изменения статуса заказа на "доставлено" и "возникли проблемы"

font-end модули:
1. app - main-модуль приложения, загружает в себя все используемые модули, а так же 'ngMaterial' и 'ngMessages';
2. auth - модуль с компонентом формы для авторизации, сервисом (session.service.js) для управления текущей сессии и сервисами хранение и получения информации о клиенте (dbusers.service.js и user.service.js);
3. client - модуль для отображения главной панели клиента (client-page) и компонентами для отображения текущего клиента (account-info), текущих заказов клиента (order-detail), заказа блюд (order-create). Так же имеет сервисы для динамического отображения статуса заказов (order.socket.js) и получения данных заказов (order.service.js);
4. dishes - вспомогательный модуль с компонентами для отображения списков используемых блюд;
5. kitchen - модуль для отображения панели повара, использует сервис для динамичесого отображения изменения статусов заказов (kitchen.socket.js);
6. shared - вспомогательный модуль для отображения toolbar-а приложения