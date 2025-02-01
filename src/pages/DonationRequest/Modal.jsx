const Modal = ({ children }) => {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  