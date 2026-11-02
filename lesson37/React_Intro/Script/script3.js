const root = ReactDOM.createRoot(document.getElementById('root'));
const Group = () => {
    const subTitle="Tel-Ran";
    return (
        <div>
            <h1>FullStack-66</h1>
            <h2>{subTitle} - {Math.random()}</h2>
        </div>
    );
};
root.render(
    <>
        <Group />
        <Group />
        <Group />
    </>
);