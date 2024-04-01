type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error?: string | null;
  Group?: React.ReactNode | null;
};

export default function InputGroup({ label, error, Group, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={props.name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="relative flex w-full items-stretch rounded-md shadow-sm">
        <input
          {...props}
          name={props.name}
          id={props.name}
          className={`flex-auto block w-full rounded-s dounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition duration-100 ease-in-out ${error ? 'ring-red-300 focus:outline-red-400' : 'ring-gray-300 focus:outline-blue-400'}`} />
        {Group}

      </div>
      {error && <span className="absolute text-xs font-medium text-red-400">{error}</span>}
    </>
  );
}