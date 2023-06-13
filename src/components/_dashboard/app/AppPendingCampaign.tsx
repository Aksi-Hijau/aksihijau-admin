import React from 'react';
import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-ant-design/bug-filled';
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import { fShortenNumber } from '@/utils/formatNumber';

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0)
    // color: theme.palette.error.darker,
    // backgroundColor: theme.palette.error.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.warning.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
        theme.palette.warning.dark,
        0.24
    )} 100%)`
}));

const TOTAL = 234;

const AppPendingCampaign = (): JSX.Element => {
    return (
        <RootStyle>
            <IconWrapperStyle>
                <Icon icon="mdi:receipt-text-pending" width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Pending Campaign
            </Typography>
        </RootStyle>
    );
};

export default AppPendingCampaign;
