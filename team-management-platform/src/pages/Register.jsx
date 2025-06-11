// import React, { useState } from 'react';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         username: '',
//         password: '',
//         email: '',
//         contactNumber: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Add registration logic here (e.g., API call)
//         console.log('User registered:', formData);
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//             <h2 style={{ textAlign: 'center' }}>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label>Username:</label>
//                     <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
//                         style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label>Contact Number:</label>
//                     <input
//                         type="text"
//                         name="contactNumber"
//                         value={formData.contactNumber}
//                         onChange={handleChange}
//                         required
//                         style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//                     />
//                 </div>
//                 <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Register;