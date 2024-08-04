
// GET request
// GET request
export const getEmployee = async (empId) => {
  console.log("iamrunning");
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${empId}`, {
      method: 'GET',
      headers: {
        environmentId: import.meta.env.VITE_REACT_APP_ENVIRONMENT_ID,
        projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
      },
    });
    if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw error;
  }
};

// POST request
export const createEmployee = async (employeeData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        environmentId: import.meta.env.VITE_REACT_APP_ENVIRONMENT_ID,
        projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
      },
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

// DELETE request
export const deleteEmployee = async (empId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${empId}`, {
      method: 'DELETE',
      headers: {
        environmentId: import.meta.env.VITE_REACT_APP_ENVIRONMENT_ID,
        projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
      },
    });
    if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
    return response.status === 204 ? { success: true } : await response.json();
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};
