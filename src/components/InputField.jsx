import PropTypes from "prop-types";

function InputField({ label, type, isDisabled, value, accept, onChange, name }) {

    return (
        <div className="flex flex-col w-[18rem] gap-2">
            <label htmlFor={label} className="font-medium">{label}</label>
            <input
                required
                type={type}
                disabled={isDisabled}
                name={name}
                id={name}
                value={value}
                accept={accept}
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-300 outline-none rounded h-8 p-2 focus:border-2 focus:border-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
        </div>
    );
}

InputField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    accept: PropTypes.string,
    onChange: PropTypes.func,
    isDisabled: PropTypes.bool,
    name: PropTypes.string,
}

export default InputField;
