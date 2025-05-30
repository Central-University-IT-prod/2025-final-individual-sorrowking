! Код для создания персонажа в Three.js и ассеты для этого взяты из проекта в публичном доступе https://github.com/wass08/r3f-ultimate-character-configurator
FINAL!

# 🏋️ FitLab - Ваш персональный фитнес-помощник

## 🛠️ Стек разработки
React TS + Vite + Mantine (удобные оптимизированные компоненты) + Zustand (стейт-менеджер) + Three JS (создание 3D персонажа)

## 🌟 Экстра-фичи: 
1. Добавление карточки упражнения в список избранных по нажатию на сердце (для удобного нахождения в конструкторе тренировок)
2. Реализация возможности переставлять упражнения в тренировке через drag and drop
3. Реализация персонажа в 3D
4. Дополненная система геймификации (монеты + достижения + уровни, за которые даются награды)
5. Статистика пользователя в профиле
6. Туториал, рассказывающий про базовый функционал каждой страницы (кнопка ? в навбаре)
7. Дополнения, которых нет в тз, но которые кажутся логичными для юзер-френдли интерфейса (расширенное управление таймером отдыха/упражнения в тренировке)
8. Дополнения по мелочи (визитная страница/страница не найдено/интересные факты во время отдыха)

## ❗ Дополнительно:
1. Реализованы все фичи и добавлены экстра-фичи
2. Тяжелые модули декомпозированы (почти все менее 120 строк)
3. Используется модульная архитектура 
4. Выставлены параметры доступности
5. Сайт полностью адаптивен
6. Есть панель для теста (кнопки в профиле: сбросить пользователя, добавить 1000 монет, добавить 1000 опыта)


## Подробный обзор каждого модуля

### 0. Начало:
Визитная страница, с которой можно перейти в основное приложение.

При переходе в основу пользователю предлагается ввести имя, пол, возраст, возраст и вес. 
Эти параметры используются для расчета рекомендованных параметров для упражнений в тренировке.
В основном приложении есть навигация, с помощью которой можно получить доступ к модулям, а также кнопка, открывающая модал информации о странице

### 1. Реализация каталога упражнений (CataloguePage):
Пользователю представляется скроллящаяся библиотека карточек упражнений с названием, сложностью, тегами, необходимой экипировкой и целевыми параметрами (время, вес, количество повторов, дистанция).

Карточки можно фильтровать по названию, тегам, экипировке, сложности.
Можно добавить карточку - для этого надо указать название, сложность, теги, экипировку, целевые параметры, средние значения для целевых параметров (по средним значениям для обычного человека высчитываются персональные значения), текст и картинку. Для multiselect предусмотрена возможность вводить свои теги/оборудование, которых нет в каталоге (после добавления упражнеия будут появляться в фильтрах)

Юзер может:
- добавить карточку в избранное (и потом найти ее в модале добавления упражнения)
- посмотреть полную информацию (текст и описание)
- редактировать карточку (все те же параметры,  что и при добавлении упражнения)
- удалять (при этом, если карточка используется в тренировке, перед удалением появляется предупреждение, при повторном нажатии удаляется)

При заходе на сайт автоматически генерируются 15 упражнений и интегрируются в общий поток
Хранение изображений реализовано через IndexedDB (у localStorage маленький лимит на хранение данных)

### 2. Реализация составления тренировок:
#### 2.1 Конструктор тренировок (TrainingConstructorPage):
Пользователь может составить персональную тренировку. 
Для этого необходимо добавить упражнения - при нажатии на кнопку с плюсом появляется модал, в котором можно выбрать упражнения из общего каталога либо же только из избранных. При выборе автоматически высчитывается необходимое количество повторений/вес/дистанция/время (высчитывание идет с учетом всех физических параметров пользователя), основываясь на средних значениях для целевых параметров.

При добавлении некоторых упражнений пользователь может перейти в режимы модификации:
- удаление упражнения из конструктора
- перестановка упражнений для планировки графика тренировки: используется Drag and Drop для удобного перетягивания упражнений
- редактирование (если пользователь хочет увеличить/уменьшить предложенную нагрузку). Если выставленная нагрузка превышает его персональную в 1.5 раза, то показывается предупреждение (если юзер хочет продолжить, то надо нажать повторно).

Помимо добавления упражнений вручную, пользователь может нажать на кнопку с роботом, предварительно выбрав теги и количество упражнений - будут подобраны упражнения, удовлетворяющие заданным параметрам.

После указания всех интересующих упражнений, пользователь может сохранить упражнение, указав ему название и описание, либо же использовать только один раз.

Прогресс составления новой тренировки сохраняется.

#### 2.2 Сохраненные тренировки (SavedTrainingsPage):
Пользователь может просмотреть список сохраненных тренировок: для каждой отображается название, описание (если есть), сложность и выпадающий список упражнений
Тренировки можно:
- Запускать (пункт 3)
- Редактировать (переход на 2.1, но вместо создания тренировки пользователю будет предложено редактирование)
- Удалить

При входе на страницу генерируются 3 тренировки (кардио, сложная и случайная) (!если число тренировок меньше 3, всегда будут присутствовать дефолтные тренировки, такая условность) 
За первые две можно получить соответствующие ачивки.


### 3. Реализация режима тренировки (TrainingPage):
При переходе на страницу запускается тренировка. 
- Для каждого упражнения отображаются название и все целевые параметры.
- При наличии времени у упражнения запускается таймер, который можно остановить или перезапустить при необходимости.
- Упражнения можно пропускать (не будут засчитываться в статистике)
- Между упражнениями запускается таймер отдыха, который можно остановить, прибавить/убавить по 10 секунд, пропустить.
- Во время отдыха показывается интересный факт, чтобы пользователю было над чем подумать.
- По окончании тренировки отображается статистика: все сделанные упражнения с перечислением их параметров, время начала/окончания тренировки с общимм временем.
- Также отображаются полученные монеты и опыт с прогрессом уровня (пункт 4.2). Если пользователь повысил свой уровень, ему показываются все полученные награды.

### 4. Реализация персонажа + профиля пользователя
#### 4.1 Профиль пользователя (ProfilePage):
Вынес профиль в отдельную страницу, чтобы не перегружать страницу с персонажем и не рендерить 3D, если пользователь хочет просто поменять данные или что-нибудь посмотреть.
Есть 4 таба:
1. Информация о пользователе. Отображаются все данные, которые используются в тренировках
2. Редактирование информации. Можно поменять все данные при необходимости.
3. Прогресс пользователя. Отображаются уровень и все уровневые награды, которые пользователь получил/получит за выполнение тренировок, а также статистика пользователя (количество проведенных тренировок), вдохновлено игровой моделью "боевого пропуска"
4. Достижения. Отображается список всех достижений с личным прогрессом по каждому.

#### 4.2 Реализация персонажа (AvatarPage):
Реализован персонаж на Three.js с использованием ассетов в публичном доступе (https://github.com/wass08/r3f-ultimate-character-configurator).
- Персонаж меняется при достижении новых уровней (а именно 4, 7 и 10) - предусмотрено по 4 варианта тела для мужского и женского аватара. 
- Персонажа можно кастомизировать - менять прическу, шляпу, брови, глаза и т.д. Не все предметы кастомизации открыты сразу, есть 3 способа получения: покупка за монеты, достижение уровней, а также ачивки. Если предмет закрыт, появляется модал с условием разблокировки (и покупкой, если предмет за монеты).
- Можно устанавливать цвет волос/одежды
(*возможно, придется немного подождать на странице, пока прогрузятся все ассеты)