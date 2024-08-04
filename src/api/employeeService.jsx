// src/api/employeeService.js

const BASE_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/emp_cr`;

// GET all employees
export const getEmployees = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                environmentId: import.meta.env.VITE_REACT_APP_ENVIRONMENT_ID,
                projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
            },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

// Create a new employee
export const createEmployee = async (employeeData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                environmentId: import.meta.env.VITE_REACT_APP_ENVIRONMENT_ID,
                projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
            },
            body: JSON.stringify(employeeData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

// Fetch a specific employee by ID
export const getEmployeeDetails = async (empId) => {
    try {
        const response = await fetch(`${BASE_URL}/${empId}`, {
            method: 'GET',
            headers: {
                environmentId: import.meta.env.VITE_REACT_APP_ENVIRONMENT_ID,
                projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
            },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching employee details:', error);
        throw error;
    }
};

// Replace an existing employee by ID
export const replaceEmployee = async (empId, employeeData) => {
    try {
        const response = await fetch(`${BASE_URL}/${empId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                environmentId: import.meta.env.VITE_REACT_APP_ENVIRONMENT_ID,
                projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
            },
            body: JSON.stringify(employeeData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error replacing employee:', error);
        throw error;
    }
};

// Update an existing employee by ID
export const updateEmployee = async (empId, employeeData) => {
    try {
        const response = await fetch(`${BASE_URL}/${empId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                environmentId: import.meta.env.VITE_REACT_APP_ENVIRONMENT_ID,
                projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
            },
            body: JSON.stringify(employeeData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

// Delete an employee by ID
export const deleteEmployee = async (empId) => {
    try {
        const response = await fetch(`${BASE_URL}/${empId}`, {
            method: 'DELETE',
            headers: {
                environmentId: import.meta.env.VITE_REACT_APP_ENVIRONMENT_ID,
                projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
            },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};
