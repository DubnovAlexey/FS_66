// ============================================================================
// Учебный профиль студента: хранение данных в константах и базовый рендеринг JSX
// ============================================================================

// 1. Объявление исходных данных профиля в константах JavaScript.
// Использование const гарантирует защиту ссылок от непреднамеренного переопределения.
const profileTitle = "Мой учебный профиль";
const studentName = "Алексей Смирнов";
const studentAge = 24;
const studentCity = "Реховот";
const courseName = "Fullstack & React Разработка";

// 2. Объявление показателей учебного плана и расчёт оставшихся занятий.
const totalLessons = 110;
const completedLessons = 37;

// Вычисление количества оставшихся занятий на основе исходных констант.
const remainingLessons = totalLessons - completedLessons;

// 3. Инициализация корневого узла React 18 на базе DOM-элемента #root.
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// 4. Декларативная отрисовка интерфейса (JSX) в корневой контейнер.
// Фигурные скобки {} выполняют интерполяцию значений переменных JavaScript в разметку.
// Атрибут className используется вместо стандартного HTML-атрибута class,
// так как ключевое слово class зарезервировано в спецификации JavaScript.
root.render(
    <div className="profile-card">
        <h1 className="profile-title">{profileTitle}</h1>

        <div className="profile-info">
            <p className="info-row">
                <span className="info-label">Имя студента:</span>
                <span className="info-value">{studentName}</span>
            </p>

            <p className="info-row">
                <span className="info-label">Возраст:</span>
                <span className="info-value">{studentAge} года</span>
            </p>

            <p className="info-row">
                <span className="info-label">Город:</span>
                <span className="info-value">{studentCity}</span>
            </p>

            <p className="info-row">
                <span className="info-label">Изучаемый курс:</span>
                <span className="info-value course-badge">{courseName}</span>
            </p>
        </div>

        <div className="lessons-summary">
            <div className="lesson-box completed">
                <span className="lesson-number">{completedLessons}</span>
                <span className="lesson-caption">Пройдено занятий</span>
            </div>

            <div className="lesson-box remaining">
                <span className="lesson-number">{remainingLessons}</span>
                <span className="lesson-caption">Осталось занятий (из {totalLessons})</span>
            </div>
        </div>
    </div>
);