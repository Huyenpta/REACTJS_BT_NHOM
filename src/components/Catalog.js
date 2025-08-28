import { useState } from "react";

function Catalog(props) {
    const cat = props.cat;
    const [active, setActive] = useState("Active");
    const [color, SetColor] = useState("");
    const disable = () => {//arrow funciton
        if (active == "Active")
            setActive("Deactive");// hiểu active="Deactive"
        else
            setActive("Active");
    }
    const favourite = () => {
        if (color == "")
            SetColor("text-danger");
        else
            SetColor("");

    }
    return (
        <div>
            <h1>{cat.name}</h1>
            <h2>Total Item: {cat.count} products</h2>
            <p>{active}</p>
            <button onClick={disable} type="button">Disable</button>
            <p><i onClick={favourite} class={"bi bi-emoji-neutral " + color}></i></p>
        </div>
    )
}
export default Catalog;

