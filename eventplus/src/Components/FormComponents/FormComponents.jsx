import React from 'react';
import "./FormComponents.css"

export const Input = ({
    type,
    id,
    required,
    additionalClass = "",
    name,
    placeholder,
    manipulationFunction, 
    value
}) => {
    return (
        <input 
        type={type}
        id={id}
        name={name}
        value={value}
        required={required}
        className={`input-component ${additionalClass}`}
        placeholder={placeholder}
        onChange={manipulationFunction}
        autoComplete='off'
    />
    );
}
export const Button = ({
    textButton,
    id,
    name,
    type,
    additionalClass = "",
    manipulationFunction
}) => {
    return (
        <button 
        type={type}
        name={name}
        id={id}
        className={`button-component ${additionalClass}`}
        onClick={manipulationFunction}
        >
        {textButton}
        </button>
    )
}

const dados = [
    {value: "12345", text: "Vestuário Masculino"},
    {value: "54321", text: "Vestuário Feminino"},
];
export const Select = ({
    option = [],
    name,
    id,
    required,
    additionalClass,
    manipulationFunction = "",
    defaultValue



}) => {
    return (
        <select
            name={name}
            id={id}
            required={required}
            className={`input-component ${additionalClass}`}
            onChange={manipulationFunction}
            value={defaultValue}
        >
            <option value="">Selecione</option>
            {option.map((opt) => {
                return (
                    <option key={opt.idTipoEvento} value={opt.idTipoEvento}>{opt.titulo}</option>
                )

            })}
        </select>

    );
}
export const Select2 = ({
    option = [],
    name,
    id,
    required,
    additionalClass,
    manipulationFunction = "",
    defaultValue



}) => {
    return (
        <select
            name={name}
            id={id}
            required={required}
            className={`input-component ${additionalClass}`}
            onChange={manipulationFunction}
            value={defaultValue}
        >
            <option value="">Selecione</option>
            {option.map((opt) => {
                return (
                    <option key={opt.value} value={opt.value}>{opt.text}</option>
                )

            })}
        </select>

    );
}