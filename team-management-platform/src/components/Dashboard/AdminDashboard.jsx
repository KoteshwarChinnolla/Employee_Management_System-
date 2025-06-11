// import React from 'react';
// import { useEffect, useState } from 'react';

// const AdminDashboard = () => {
//     const [employeeCount, setEmployeeCount] = useState(0);
//     const [activeTeams, setActiveTeams] = useState(0);
//     const [recentUpdates, setRecentUpdates] = useState([]);
//     const [activeContributors, setActiveContributors] = useState([]);

//     useEffect(() => {
//         // Fetch data for the dashboard (mocked for now)
//         fetchEmployeeCount();
//         fetchActiveTeams();
//         fetchRecentUpdates();
//         fetchActiveContributors();
//     }, []);

//     const fetchEmployeeCount = () => {
//         // Mock API call
//         setEmployeeCount(100); // Example count
//     };

//     const fetchActiveTeams = () => {
//         // Mock API call
//         setActiveTeams(10); // Example count
//     };

//     const fetchRecentUpdates = () => {
//         // Mock API call
//         setRecentUpdates([
//             'Employee John Doe was added to the team.',
//             'Team Alpha has a new lead: Jane Smith.',
//             'New policy updates have been published.',
//         ]);
//     };

//     const fetchActiveContributors = () => {
//         // Mock API call
//         setActiveContributors(['Alice', 'Bob', 'Charlie']);
//     };

//     return (
//         <div className="admin-dashboard">
//             <h1>Admin Dashboard</h1>
//             <div className="dashboard-stats">
//                 <div className="stat">
//                     <h2>Total Employees</h2>
//                     <p>{employeeCount}</p>
//                 </div>
//                 <div className="stat">
//                     <h2>Active Teams</h2>
//                     <p>{activeTeams}</p>
//                 </div>
//                 <div className="stat">
//                     <h2>Recent Updates</h2>
//                     <ul>
//                         {recentUpdates.map((update, index) => (
//                             <li key={index}>{update}</li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="stat">
//                     <h2>Most Active Contributors</h2>
//                     <ul>
//                         {activeContributors.map((contributor, index) => (
//                             <li key={index}>{contributor}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;