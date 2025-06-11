// import React, { useState, useEffect } from 'react';

// const EmployeeDirectory = () => {
//     const [employees, setEmployees] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const fetchEmployees = async () => {
//             const response = await fetch('/data/employees.json');
//             const data = await response.json();
//             setEmployees(data.employees);
//         };

//         fetchEmployees();
//     }, []);

//     const filteredEmployees = employees.filter(employee =>
//         employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="container mt-4">
//             <h2>Employee Directory</h2>
//             <input
//                 type="text"
//                 className="form-control mb-3"
//                 placeholder="Search employees..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <ul className="list-group">
//                 {filteredEmployees.map(employee => (
//                     <li key={employee.id} className="list-group-item">
//                         <h5>{employee.name}</h5>
//                         <p className="mb-1">Role: {employee.role}</p>
//                         <p className="mb-1">Team: {employee.team}</p>
//                         <p className="mb-0">Contact: {employee.contact && employee.contact.phone}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default EmployeeDirectory;

// // This file is not required for deployment. Please delete it.