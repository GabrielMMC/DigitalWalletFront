type SelectProps = React.ComponentProps<'select'> & {
  label: string;
  error?: string | null;
  children: React.ReactNode
};

export default function Select({ label, error, children, ...props }: SelectProps) {
  return (
    <>
      <label htmlFor={props.name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="relative rounded-md shadow-sm">
        <select
          {...props}
          id={props.name}
          name={props.name}
          autoComplete={props.name}
          className={`block w-full rounded-md border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 bg-white placeholder:text-gray-400 sm:text-sm sm:leading-6 transition duration-100 ease-in-out ${error ? 'ring-red-300 focus:outline-red-400' : 'ring-gray-300 focus:outline-blue-400'}`} style={{ height: 36 }}>
          {children}
        </select>
        {error && <span className="absolute text-xs font-medium text-red-400">{error}</span>}
      </div>
    </>
  );
}