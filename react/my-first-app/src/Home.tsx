import { useEffect } from "react";

function Home() {
    useEffect(() => {
        document.title = "Titulo da Home";
    }, []);

    return (
        <h1>Home</h1>
    );
}

export default Home;