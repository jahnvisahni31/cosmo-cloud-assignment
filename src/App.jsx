import { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import { getEmployees, createEmployee, deleteEmployee, getEmployeeDetails } from './api/employeeService';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employees = await getEmployees();
      setEmployees(employees);
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = async (employee) => {
    const newEmployee = await createEmployee(employee);
    setEmployees([...employees, newEmployee]);
    setIsAdding(false);
  };

  const handleDeleteEmployee = async (id) => {
    await deleteEmployee(id);
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleMoreDetails = async (id) => {
    const employeeDetails = await getEmployeeDetails(id);
    alert(`More details for employee ID: ${id}\nName: ${employeeDetails.name}\nRole: ${employeeDetails.role}`);
  };

  return (
    <div>
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