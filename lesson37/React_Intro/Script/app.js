//Количество студентов
let studentsCount = 10;

// найти html-элемент
const paragraph=document.querySelector('#students-count');

// записать значение в html-элемент
paragraph.textContent=`Количество студентов: ${studentsCount}`;//10

studentsCount=11;

//вручную обновляем html-элемент
paragraph.textContent=`Количество студентов: ${studentsCount}`;//11

/*
Список из 100 студентов
форма добавления студента
Поиск по имени
Фильтр по учебной группе
Статистика
Кнопки редактирования и удаления
...
 */

//================================================



