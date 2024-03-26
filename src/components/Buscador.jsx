import  { useState} from 'react';
const Buscador = ({ setSearchTerm }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setSearchTerm(newValue);
    };

    return (
        <div className="mb-7">
            <input
                type="text"
                placeholder="Search for ID."
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Buscador;