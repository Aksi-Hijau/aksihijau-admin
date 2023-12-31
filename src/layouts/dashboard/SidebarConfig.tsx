import React from 'react';
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import { NavItemConfig } from '@/models';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig: NavItemConfig[] = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon(pieChart2Fill)
    },
    {
        title: 'user',
        path: '/dashboard/user',
        icon: getIcon(peopleFill)
    },
    {
        title: 'campaigns',
        path: '/dashboard/campaigns',
        icon: getIcon("ph:tree-fill")
    },
];

export default sidebarConfig;
