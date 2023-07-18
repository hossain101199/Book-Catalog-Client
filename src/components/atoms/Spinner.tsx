const Spinner = ({
  spinnerColour = "border-primary",
}: {
  spinnerColour?: string;
}) => {
  return (
    <div className="flex justify-center">
      <div
        className={`w-8 h-8 border-t-4 border-e-4 border-solid rounded-full animate-spin ${spinnerColour}`}
      />
    </div>
  );
};

export default Spinner;
