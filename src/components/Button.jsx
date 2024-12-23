import PropTypes from "prop-types";


function Button({ type, name, styles, onClick }) {
    return (
        <button type={type}
                onClick={onClick}
                className={`bg-[#636ae8] text-white font-bold ml-2 px-5 py-3 rounded ${styles}`}>{name}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    styles: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button;