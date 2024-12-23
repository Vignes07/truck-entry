const LoadingSpinner = () => {

    return (
        <div className="z-999 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur bg-black bg-opacity-50">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-white w-16 h-16"></div>
        </div>
    );
};

export default LoadingSpinner;
