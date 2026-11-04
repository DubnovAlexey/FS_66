// ============================================================================
// Учебный профиль студента: декомпозиция интерфейса на переиспользуемые компоненты
// ============================================================================

// 1. Исходные данные студента, хранящиеся в константах JavaScript
const pageHeading = "Мой учебный профиль";
const userFullName = "Давид Леви";
const userAge = 27;
const userCity = "Хайфа";
const studyTrack = "React.js & Современный Frontend";

// 2. Параметры курса и вычисление оставшегося количества занятий
const totalCourseLessons = 110;
const passedLessons = 37;
const remainingCourseLessons = totalCourseLessons - passedLessons;

// Определение текстового статуса прогресса с помощью тернарного оператора
const statusMessage = passedLessons >= 35
    ? "Первая треть курса позади"
    : "Cтарт обучения";

// 3. Дочерний презентационный компонент InfoCard для вывода одной карточки параметра.
// Принимает входные свойства (Props) и извлекает поля label и value через деструктуризацию параметров.
// Использование единого компонента устраняет дублирование однотипной разметки (принцип DRY).
function InfoCard({ label, value }) {
    return (
        <div className="data-card">
            <span className="data-label">{label}</span>
            <span className="data-value">{value}</span>
        </div>
    );
}

// 4. Корневой компонент приложения App, объединяющий шапку, сетку карточек и блок метрик
function App() {
    return (
        <main className="cyber-dashboard">
            <header className="dashboard-header">
                <span className="status-pill">{statusMessage}</span>
                <h1 className="dashboard-title">{pageHeading}</h1>
            </header>

            {/* Переиспользование компонента InfoCard с передачей различных значений через пропсы */}
            <section className="data-grid">
                <InfoCard label="Имя студента" value={userFullName} />
                <InfoCard label="Возраст" value={userAge + " лет"} />
                <InfoCard label="Город" value={userCity} />
                <InfoCard label="Изучаемый курс" value={studyTrack} />
            </section>

            {/* Секция количественных показателей прохождения курса */}
            <section className="metrics-panel">
                <div className="metric-tile accent-cyan">
                    <div className="metric-value">{passedLessons}</div>
                    <div className="metric-title">Пройдено занятий</div>
                </div>

                <div className="metric-tile accent-purple">
                    <div className="metric-value">{remainingCourseLessons}</div>
                    <div className="metric-title">Осталось занятий</div>
                </div>

                <div className="metric-tile accent-slate">
                    <div className="metric-value">{totalCourseLessons}</div>
                    <div className="metric-title">Всего в курсе</div>
                </div>
            </section>
        </main>
    );
}

// 5. Инициализация корня ReactDOM и монтирование главного компонента <App />
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);