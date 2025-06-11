// import React from 'react';
// import useAuth from '../../hooks/useAuth';

// const EmployeeDashboard = () => {
//     const { user } = useAuth();

//     return (
//         <div className="container-fluid" style={{ background: '#f5f7fa', minHeight: '100vh', padding: '32px' }}>
//             <div className="row mb-4">
//                 <div className="col">
//                     <h1 style={{ color: '#1a237e', fontWeight: 700 }}>Dashboard</h1>
//                 </div>
//             </div>
//             <div className="row mb-4">
//                 <div className="col">
//                     <div className="card shadow border-0 mb-4" style={{ background: '#fff' }}>
//                         <div className="card-body">
//                             <h2 className="card-title" style={{ color: '#1a237e' }}>Welcome, {user?.name}</h2>
//                             <div className="row">
//                                 <div className="col-md-4">
//                                     <p><strong style={{ color: '#1a237e' }}>Role:</strong> <span style={{ color: '#ffd600' }}>{user?.role}</span></p>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <p><strong style={{ color: '#1a237e' }}>Team:</strong> <span style={{ color: '#ffd600' }}>{user?.team}</span></p>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <p><strong style={{ color: '#1a237e' }}>Contact:</strong> <span style={{ color: '#ffd600' }}>{user?.contact}</span></p>
//                                 </div>
//                             </div>
//                             {/* Add more summary info if needed */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="row g-4">
//                 <div className="col-md-4">
//                     <div className="card shadow border-0" style={{ background: '#fff' }}>
//                         <div className="card-body text-center">
//                             <h5 className="card-title" style={{ color: '#1a237e' }}>Total Employees</h5>
//                             <p className="display-5" style={{ color: '#ffd600', fontWeight: 700 }}>100</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="card shadow border-0" style={{ background: '#fff' }}>
//                         <div className="card-body text-center">
//                             <h5 className="card-title" style={{ color: '#1a237e' }}>Active Teams</h5>
//                             <p className="display-5" style={{ color: '#ffd600', fontWeight: 700 }}>10</p>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Add more cards as needed */}
//             </div>
//         </div>
//     );
// };

// export default EmployeeDashboard;