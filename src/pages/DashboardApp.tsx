import React from 'react';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import Page from '@/components/Page';
import {
    AppTasks,
    AppNewUsers,
    AppPendingCampaign,
    AppActiveCampaign,
    AppNewsUpdate,
    AppTransaction,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppCurrentSubject,
    AppConversionRates
} from '@/components/_dashboard/app';

const DashboardApp = (): JSX.Element => {
    return (
        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Hi, Welcome back</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppTransaction />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppNewUsers />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppActiveCampaign />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppPendingCampaign />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppWebsiteVisits />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentSubject />
                    </Grid>
                    
                </Grid>
            </Container>
        </Page>
    );
};

export default DashboardApp;
