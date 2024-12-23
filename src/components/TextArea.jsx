import PropTypes from "prop-types";

function TextArea({ label, value, onChange, name }) {
    return (
        <div className="flex flex-col w-[18rem] gap-2">
            <label htmlFor={label} className="font-medium">{label}</label>
            <textarea
                name={name}
                id={name}
                className="border outline-none rounded p-2"
                value={value}
                rows={4}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

TextArea.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
}

export default TextArea;
