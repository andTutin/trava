##  Чтобы развернуть проект необходимо:

Клонировать репозиторий
```sh
$ git clone git@github.com:andTutin/trava
```
Перейти в корень проекта
```sh
$ cd trava
```
Следующая команда установит зависимости для frontend и  backend сервисов, создаст файл .dev.env, в который необходимо добавить jwt secret
```sh
$ npm run prepare
```
Запустить проект в контейнерах в режиме разработки
```sh
$ npm run dev:compose:up
```
Остановить его
```sh
$ npm run dev:compose:down
```

Аналогичные команды для продакшена
```sh
$ npm run compose:up
$ npm run compose:down
```

Эта команда удалит созданные образы и именованный том для mongodb
```sh
$ npm run clean
```
