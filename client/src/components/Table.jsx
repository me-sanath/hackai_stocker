// Table.jsx
import React from 'react';

const Table = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#222]">
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">E</td>
              <td className="py-2 px-4 border-b">PE</td>
              <td className="py-2 px-4 border-b">DivY</td>
              <td className="py-2 px-4 border-b">MC</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Sec</td>
              <td className="py-2 px-4 border-b">PB</td>
              <td className="py-2 px-4 border-b">52h</td>
              <td className="py-2 px-4 border-b">50ma</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">COunt</td>
              <td className="py-2 px-4 border-b">Peg</td>
              <td className="py-2 px-4 border-b">52l</td>
              <td className="py-2 px-4 border-b">200ma</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
