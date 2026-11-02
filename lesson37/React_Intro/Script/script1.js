// import "../CSS/App.css"

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const hello = <h1>Наш учебный центр</h1>;

const title=<div>
    <h1>Учебный центр</h1>
    <br/>
    <hr/>
    <img src="qqq.jpg" alt="FOTO"/>
    <p>добро пожаловать</p>
</div>;


const a=10;
const b=20;
const college="tel-Ran";

const adress={
    city:"Rehovot",
    street:"Ramat Hasharon",
    number:123
}
const age=15;

const myStyle={
    color:"green",
    fontSize:"30px"
}
const fragment=<>
    <h1 style={{color:"red"}}>Учебный центр {college.toUpperCase()}</h1>
    <p style={{color:"blue",fontSize:"50px"}}>добро пожаловать, сумма = {a+b}</p>
    <p>Город {adress.city}</p>
    <p>Улица {adress.street}</p>
    <p style={myStyle}>Возраст  {age}</p>
    <p>{age >=18 ? "Adult" : "Child"}</p>
</>

// <p>Город {adress}</p> // ERROR4 объект выводиться поэлементно
// <p>{if (age>=18) "Adult"}</p> //ERROR5
// <h1 style={color:"red"}>Учебный
// центр {college.toUpperCase()}</h1> //ERROR6 для стиля надо
// указывать объект со свойствами
root.render(fragment);

const studentName= "John Doe";


// const studentNameElement = <h1>Привет, {studentName}!;//Error2
// const studentNameElement = <h1>Привет, studentName!</h1>; //Error1
//  const studentNameElement = <h1>Привет, {studentName}!</h1>;
// root.render(studentNameElement);

