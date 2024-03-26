import  { useState, useEffect } from 'react';
import Buscador from './Buscador';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const MiApi = () => {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [alphabeticalOrder, setAlphabeticalOrder] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('https://www.feriadosapp.com/api/laws.json');
              if (!response.ok) {
                  throw new Error('Error fetching data');
              }
              const jsonData = await response.json();
              setHolidays(jsonData.data);
              setFilteredHolidays(jsonData.data);
          } catch (error) {
              console.error('Error al obtener los datos:', error);
          }
      };

      fetchData();
  }, []);

  useEffect(() => {
      const filteredData = holidays.filter(holiday =>
          holiday.id.includes(searchTerm)
      );
      setFilteredHolidays(filteredData);
  }, [searchTerm, holidays]);

  const handleSortById = () => {
      const sortedHolidays = [...filteredHolidays].sort((a, b) => {
          const comparison = alphabeticalOrder ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
          return comparison;
      });
      setFilteredHolidays(sortedHolidays);
      setAlphabeticalOrder(!alphabeticalOrder);
  };

  return (
      <div>
          <h1>Holidays</h1>
          <Buscador setSearchTerm={setSearchTerm} />  
           <Button variant="outline-light" onClick={handleSortById}>
              Alphabetical Order {alphabeticalOrder ? 'alphabetical' : 'inverse'}
         </Button>{' '}
         <Table responsive="lg">
              <thead>
              <tr className="table-warning">
                      <th><h5>ID</h5></th>
                      <th><h5>Title</h5></th>
                      <th><h5>Content</h5></th>
                      <th><h5>Link</h5></th>
                  </tr>
              </thead>
              <tbody className="table-warning">
                  {filteredHolidays.map(holiday => (
                      <tr key={holiday.id}>
                          <td className="border px-4 py-2">{holiday.id}</td>
                          <td className="border px-4 py-2">{holiday.title}</td>
                          <td className="border px-4 py-2">{holiday.content}</td>
                          <td className="border px-4 py-2">
                              <a href={holiday.link} target="_blank" rel="noopener noreferrer">Link</a>
                          </td>
                      </tr>
                  ))}
              </tbody>
              </Table>
      </div>
  );
};

export default MiApi;