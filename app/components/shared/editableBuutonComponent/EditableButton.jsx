const EditableButton = ({ children, className, onClick }) => {
  return (
    <main className={className} onClick={onClick}>
      {children}
    </main>
  );
};

export default EditableButton;
