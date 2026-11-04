// ============================================================================
// Учебный профиль студента: организация разметки в функциональный компонент
// ============================================================================

// 1. Инициализация констант с персональными и учебными данными студента
const titleText = "Мой учебный профиль";
const name = "Мария Коваль";
const age = 22;
const city = "Тель-Авив";
const course = "Frontend: JavaScript & React";

// 2. Данные о количестве занятий и вычисление производных показателей
const plannedLessons = 110;
const doneLessons = 37;

// Расчёт количества оставшихся занятий по курсу
const leftLessons = plannedLessons - doneLessons;

// Расчёт процента выполнения учебного плана с округлением до целого числа
const progressPercent = Math.round((doneLessons / plannedLessons) * 100);

// 3. Объявление функционального компонента StudentProfile.
// В соответствии со спецификацией React имена пользовательских компонентов
// начинаются с заглавной буквы (PascalCase), чтобы парсер JSX отличал их от штатных HTML-тегов.
function StudentProfile() {
    return (
        <div className="field">
            {/* Блок заголовка и имени студента */}
            <div className="box header-box">
                <h1>{titleText}</h1>
                <p className="description">Студент: {name}</p>
            </div>

            {/* Блок основной анкетной информации */}
            <div className="box">
                <p><strong>Возраст:</strong> {age} года</p>
                <p><strong>Город:</strong> {city}</p>
                <p><strong>Изучаемый курс:</strong> {course}</p>
            </div>

            {/* Блок статистики прохождения курса и визуальной шкалы прогресса */}
            <div className="box stats-box">
                <p><strong>Пройдено занятий:</strong> {doneLessons} из {plannedLessons}</p>
                <p><strong>Осталось занятий:</strong> {leftLessons}</p>

                {/* Встроенный (inline) стиль принимает JS-объект со свойством width,
                    значение которого формируется динамически на основе переменной progressPercent */}
                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{ width: progressPercent + "%" }}
                    >
                        {progressPercent}%
                    </div>
                </div>
            </div>
        </div>
    );
}

// 4. Создание корневого узла и рендеринг компонента <StudentProfile /> в DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StudentProfile />);