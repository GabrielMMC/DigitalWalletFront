

const Table = ({ header, children }: { header: string[], children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table
              className="min-w-full text-center text-sm font-light text-surface dark:text-white">
              <thead
                className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                <tr>
                  {header.map(item => (
                    <th key={item} scope="col" className="px-6 py-4">{item.toLocaleUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;