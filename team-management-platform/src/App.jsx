import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './components/Employee/Home';
import ProjectInfo from './components/Employee/ProjectInfo';
import ProfessionalExperience from './components/Employee/ProfessionalExperience';
import Team from './components/Employee/Team';
import Tickets from './components/Employee/Tickets';
import Settings from './components/Employee/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';
import AllEmployees from './components/Employee/AllEmployees';
import AdminHome from './components/Admin/Home';
import AddEmployee from './components/Admin/AddEmployee';
import EmployeeDetails from './components/Employee/EmployeeDetails';
import EditEmployee from './components/Admin/EditEmployee';
import AddTeam from './components/Admin/AddTeam';
import AddProject from './components/Admin/AddProject';
import Teams from './components/Admin/Teams';
import EditTeam from './components/Admin/EditTeam';
import AdminTickets from './components/Admin/Tickets';

const AppLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 992);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sidebar is fixed, so main content has marginLeft and paddingTop for navbar
    return (
        <div>
            <Navbar onSidebarToggle={() => setSidebarOpen(true)} />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div
                style={{
                    marginLeft: isMobile ? 0 : 260,
                    padding: '32px 16px',
                    minHeight: '100vh',
                    background: '#f5f7fa',
                    paddingTop: '56px' // Height of the navbar
                }}
            >
                {children}
            </div>
        </div>
    );
};

const AppRoutes = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/" exact>
                    <Redirect to="/login" />
                </Route>
                <Redirect to="/login" />
            </Switch>
        );
    }

    if (user.role.toLowerCase() === 'admin') {
        return (
            <AppLayout>
                <Switch>
                    <ProtectedRoute 
                        path="/admin/home" 
                        component={AdminHome} 
                        requireAdmin 
                    />
                    <ProtectedRoute 
                        path="/admin/add-employee" 
                        component={AddEmployee} 
                        requireAdmin 
                    />
                    <ProtectedRoute 
                        path="/admin/add-project"
                        component={AddProject}
                        requireAdmin
                    />
                    <ProtectedRoute 
                        path="/admin/add-team"
                        component={AddTeam}
                        requireAdmin
                    />
                    <ProtectedRoute 
                        path="/admin/teams"
                        component={Teams}
                        requireAdmin
                    />
                    <ProtectedRoute 
                        path="/admin/edit-employee/:name" 
                        component={EditEmployee} 
                        requireAdmin 
                    />
                    <ProtectedRoute 
                        path="/admin/edit-team/:id"
                        component={EditTeam}
                        requireAdmin
                    />
                    <ProtectedRoute 
                        path="/admin/tickets"
                        component={AdminTickets}
                        requireAdmin
                    />
                    <ProtectedRoute 
                        path="/employee/settings" 
                        component={Settings} 
                    />
                    <ProtectedRoute 
                        path="/employee-details/:name" 
                        component={EmployeeDetails} 
                    />
                    <Route path="/" exact>
                        <Redirect to="/admin/home" />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </AppLayout>
        );
    }

    // Employee routes
    return (
        <AppLayout>
            <Switch>
                <ProtectedRoute 
                    path="/employee/home/:id/:name" 
                    component={Home} 
                />
                <ProtectedRoute 
                    path="/employee/ProjectInfo" 
                    component={ProjectInfo} 
                />
                <ProtectedRoute 
                    path="/employee/professional-experience" 
                    component={ProfessionalExperience} 
                />
                <ProtectedRoute 
                    path="/employee/team" 
                    component={Team} 
                />
                <ProtectedRoute 
                    path="/employee/Tickets" 
                    component={Tickets} 
                />
                <ProtectedRoute 
                    path="/employee/settings" 
                    component={Settings} 
                />
                <ProtectedRoute 
                    path="/employee-details/:name" 
                    component={EmployeeDetails} 
                />
                <ProtectedRoute 
                    path="/employee/all-employees" 
                    component={AllEmployees} 
                />
                <Route path="/" exact>
                    <Redirect to={`/employee/home/${user.id}/${encodeURIComponent(user.name)}`} />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </AppLayout>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;