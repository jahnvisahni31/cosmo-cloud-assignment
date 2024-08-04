import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getEmployee } from '../api/apiService';

const EmployeeDetailPage = () => {
  const location = useLocation();
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    console.log("location state", location.state);
    const fetchEmployeeData = async () => {
      try {
        // checking if the data is in location and if not then we are going to make an API call
        const employeeData = location.state?.employeeData;
        
        if (employeeData) {
          setEmployee(employeeData);
        } else {

          const response = await getEmployee(empId);
          setEmployee(response);


          // console.log(`Fetching employee data for ID: ${empId}`);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } 
    };

    fetchEmployeeData();
  }, [location.state, empId]);

  return (
    <div className='relative' >
      <h3 className='text-center py-6'>Employee Detail Page</h3>
    
    {
      employee ? 
      <div className="w-full max-w-lg mx-auto p-6 bg-dark border border-dark rounded-lg shadow-lg">
        <table className="w-full bg-dark text-light border border-dark rounded-lg overflow-hidden">
            <tbody>

                {
                  employee.name && 
                <tr className="border-b border-dark">
                    <td className="py-3 px-6 font-semibold">Name</td>
                    <td className="py-3 px-6">{employee.name}</td>
                </tr>
                }

                {
                  employee._id &&
                <tr className="border-b border-dark">
                    <td className="py-3 px-6 font-semibold">ID</td>
                    <td className="py-3 px-6">{employee._id}</td>
                </tr>
                }
                
                {
                  employee.role && 

                <tr className="border-b border-dark">
                    <td className="py-3 px-6 font-semibold">Role</td>
                    <td className="py-3 px-6">{employee.role}</td>
                </tr>
                }

                {
                  employee.address &&
                <tr className="border-b border-dark">
                    <td className="py-3 px-6 font-semibold">Address</td>
                    <td className="py-3 px-6">
                      {employee.address.line1}, {employee.address.city}, {employee.address.country} ({employee.address.zip_code})
                    </td>
                </tr>
                }
                
                {
                  employee.contact_methods[0].value &&
                <tr className="border-b border-dark">
                    <td className="py-3 px-6 font-semibold">Email</td>
                    <td className="py-3 px-6">{employee.contact_methods[0].value}</td>
                </tr>
                }

                {
                  employee.contact_methods[1].value &&
                <tr>
                    <td className="py-3 px-6 font-semibold">Phone</td>
                    <td className="py-3 px-6">{employee.contact_methods[1].value}</td>
                </tr>
                }

            </tbody>
        </table>
    </div>
      :
      <div>Employee Not Found</div>
    }

    
<button className="absolute top-4 left-8">
        <Link to={`/`}>← Go Back</Link>
      </button>
  </div>
  );
};

export default EmployeeDetailPage;