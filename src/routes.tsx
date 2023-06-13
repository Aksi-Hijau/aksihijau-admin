import { Navigate, Route, Routes } from 'react-router-dom';
import React, { ReactElement } from 'react';
import DashboardLayout from '@/layouts/dashboard';
import LogoOnlyLayout from '@/layouts/LogoOnlyLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import DashboardApp from '@/pages/DashboardApp';
import Products from '@/pages/Products';
import Blog from '@/pages/Blog';
import User from '@/pages/User';
import NotFound from '@/pages/Page404';
import Campaigns from './pages/Campaigns';
import MainLayout from './layouts/MainLayout';
import Logout from './pages/Logout';

export const Router = (): ReactElement => {
    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="" element={<Navigate to="/dashboard/app" replace />} />
                <Route path="app" element={<MainLayout><DashboardApp /></MainLayout>} />
                <Route path="user" element={<MainLayout><User /></MainLayout>} />
                <Route path="campaigns" element={<MainLayout><Campaigns /></MainLayout>} />
            </Route>
            <Route path="/" element={<LogoOnlyLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="404" element={<NotFound />} />
                <Route path="" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path='logout' element={<Logout />} />
            </Route>
        </Routes>
    );
};

export default Router;
