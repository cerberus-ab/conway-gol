#### Conway's Game of Life

Имплементация на JavaScript клеточного автомата Джона Конвея.

Классические правила:
* Место действия - размеченная на клетки ограниченная плоскость.
* Каждая клетка может находиться в одном из двух состояний (живая или мертвая) и имеет 8 соседей.
* Распределение живых клеток в начале называется первым поколением.
* Каждое следующее поколение рассчитывается на основе предыдущего.
* В мёртвой клетке, рядом с которой находится ровно три живые клетки, зарождается жизнь.
* Если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае клетка умирает (от одиночества или от перенаселённости).

Руководство:
* При выборе исходного состояния инициируется новая игра.
* Скорость определяет время перехода к новому поколению.
* Когда игра не запущена или приостановлена, имеется возможность ручного редактирования клеток игрового поля.
* Ведется подсчет количества итераций (переходов) и относительной популяции живых клеток (текущей, минимальной и максимальной).
* При сохранении текущего состояния системы будет создан соответствующий локальный пункт в списке выбора исходного состояния.

Примечания по реализации:
* Используется простой алгоритм смены поколения, при котором рассматриваются все клетки игрового поля на необходимость смены состояния.
* Оганиченность плоскости определяется постоянным мертвым пространством за ее границами.
* По умолчанию размеры игрового поля расчитываются автоматически.

![Preview](/img/preview.png)