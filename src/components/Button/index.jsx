//Aqui o component foi criado em class só para fazer o teste para ver que os component funciona do mesmo jeito tipo class ou function
import './styles.css';
import { Component } from "react";

export class Button extends Component {
    render() {
        const { text, onClick, disabled } = this.props; //passando props, desse jeito para não precisar utilizar o constructor e super
        return (
            <button 
                className="button"
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
        );
    }
}