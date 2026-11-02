
const root = ReactDOM.createRoot(document.getElementById('root'));

const Student = ({ name, age }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age ? `${age}` : `Unknown`}</p>
        </div>
    );
};


const Student1 = ({name,age}) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>age: {age ?? 'unknown'}</p>
        </div>
    )
}
//<p>age: {age ? age :'unknown'}</p>
root.render(
    <>
    <div>
        <h1>Student List</h1>
        <Student1  name = {`John`} age={20}/>
        <Student1  name = {`Peter`} age={30}/>
        <Student1  name = {`Mary`} />


    <Student name="John Doe" age={20} />
    <Student name="Jane Smith" age={22} />
    <Student name="Alice Johnson" age={15} />
</div>
    </>
);