import PropTypes from "prop-types";

function Popup({isFormOpen, content}) {

    return (
        <>
            {isFormOpen && (
                <div className="absolute flex items-center justify-center top-0 h-full w-full backdrop-blur z-998">
                    {content}
                </div>
            )}
        </>
    );
}

Popup.propTypes = {
    isFormOpen: PropTypes.bool.isRequired,
    content: PropTypes.node.isRequired,
}

export default Popup;