import { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import employeeService from './api/employeeService';
const { getEmployees, addEmployee, deleteEmployee, getEmployeeDetails } = employeeService;

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const employees = await getEmployees();
        setEmployees(employees);
      } catch (err) {
        setError('Failed to fetch employees. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = async (employee) => {
    setLoading(true);
    try {
      const newEmployee = await addEmployee(employee);
      setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
      setIsAdding(false);
    } catch (err) {
      setError('Failed to add employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    setLoading(true);
    try {
      await deleteEmployee(id);
      setEmployees(prevEmployees => prevEmployees.filter((employee) => employee.id !== id));
    } catch (err) {
      setError('Failed to delete employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMoreDetails = async (id) => {
    setLoading(true);
    try {
      const employeeDetails = await getEmployeeDetails(id);
      // Show details in a modal or component instead of an alert
      alert(`More details for employee ID: ${id}\nName: ${employeeDetails.name}\nRole: ${employeeDetails.role}`);
    } catch (err) {
      setError('Failed to fetch employee details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {isAdding ? (
        <AddEmployee onBack={() => setIsAdding(false)} onSave={handleAddEmployee} />
      ) : (
        <EmployeeList
          employees={employees}
          onDelete={handleDeleteEmployee}
          onMoreDetails={handleMoreDetails}
          onAddEmployee={() => setIsAdding(true)}
        />
      )}
    </div>
  );
};

export default App;
