import { useState } from 'react';
import { createEmployee } from '../api/employeeService';
import { Link } from 'react-router-dom';

const initialData = {
  name: '',
  role: '',
  address: {
    line1: '',
    city: '',
    country: '',
    zip_code: ''
  },
  contact_methods: [
    { contact_method: 'email', value: '' }
  ]
};

const AddEmployeePage = () => {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value
      }
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newContactMethods = [...prevData.contact_methods];
      newContactMethods[index] = {
        ...newContactMethods[index],
        [name]: value
      };
      return {
        ...prevData,
        contact_methods: newContactMethods
      };
    });
  };

  const addContactMethod = () => {
    setFormData(prevData => ({
      ...prevData,
      contact_methods: [...prevData.contact_methods, { contact_method: 'email', value: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createEmployee(formData);
      setSuccess('Employee created successfully!');
      setFormData(initialData); // Reset form
      console.log('Employee created:', result);
    } catch (error) {
      setError(error.message || 'Failed to create employee.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative pb-10 mb-20'>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <h3 className='text-white my-6'>Add Employee Details</h3>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name<sup>*</sup></label>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role<sup>*</sup></label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        
        <h6 className='mb-4'>Full Address</h6>

        <div className="mb-5">
          <label htmlFor="line1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Line 1</label>
          <input
            type="text"
            name="line1"
            value={formData.address.line1}
            onChange={handleAddressChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City<sup>*</sup></label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country<sup>*</sup></label>
          <input
            type="text"
            name="country"
            value={formData.address.country}
            onChange={handleAddressChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="zip_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip Code<sup>*</sup></label>
          <input
            type="number"
            name="zip_code"
            value={formData.address.zip_code}
            onChange={handleAddressChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <h6 className='mb-8'>Contact Methods</h6>

        {formData.contact_methods.map((contact, index) => (
          <div key={index} className='mb-16'>
            <div className="mb-1 flex items-center">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-4">Contact Method<sup>*</sup></label>
              <select
                name="contact_method"
                value={contact.contact_method}
                onChange={(e) => handleContactChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Value<sup>*</sup></label>
              <input
                name="value"
                value={contact.value}
                onChange={(e) => handleContactChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addContactMethod} className="text-white bg-green-500 hover:bg-green-600 ...">
          Add Contact Method
        </button>

        <div>
          <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {loading ? 'Creating...' : 'Submit'}
          </button>
        </div>
      </form>

      {success && <p className='text-green-400 text-center text-3xl pt-3'>{success}</p>}
      {error && <p className='text-red-500 text-center text-3xl pt-3'>{error}</p>}
      <button className="absolute top-2 left-8">
        <Link to={`/`}>← Go Back</Link>
      </button>
    </div>
  );
};

export default AddEmployeePage;
