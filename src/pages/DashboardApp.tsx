import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import Page from '@/components/Page';
import {
    AppNewUsers,
    AppPendingCampaign,
    AppActiveCampaign,
    AppTransaction,
    AppWebsiteVisits,
    AppCurrentSubject,
} from '@/components/_dashboard/app';
import useFetcher from "../hooks/useFetcher"
import { API_URL } from "../config/api.js"
import axios from 'axios';

interface SummaryDataState {
    activeUsers: number;
    successTransactions: number;
    activeCampaigns: number;
    pendingCampaigns: number
}

const DashboardApp = (): JSX.Element => {
    const [summaryData, setSummaryData] = useState<SummaryDataState>({
        activeUsers: 0,
        successTransactions: 0,
        activeCampaigns: 0,
        pendingCampaigns: 0,
    })

    const fetcher = useFetcher()

    const getSummary = async () => {
        try {
            const response = await fetcher(`${API_URL}/summary`);
            setSummaryData(response.data.data)
        } catch (error: any) {

        }
    }

    useEffect(() => {
        getSummary()
    }, [])

    return (
        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Hi, Welcome back</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppTransaction total={summaryData.successTransactions} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppNewUsers total={summaryData.activeUsers} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppActiveCampaign total={summaryData.activeCampaigns} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppPendingCampaign total={summaryData.pendingCampaigns} />
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
