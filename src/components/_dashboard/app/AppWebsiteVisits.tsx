import React, { useEffect, useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@material-ui/core';
import { BaseOptionChart } from '../../charts';
import { ApexOptions } from 'apexcharts';
import useFetcher from '@/hooks/useFetcher';
import { API_URL } from '@/config/api.js'
import toIdrFormatNumber from '@/utils/toIdrFormatNumber';

const CHART_DATA = [
    {
        name: 'Team A',
        type: 'column',
        data: []
    },
];

export const AppWebsiteVisits = (): JSX.Element => {
    const [donationTotalLastYear, setDonationsTotalLastYear] = useState<Number[]>([])
    const [labels, setLabels] = useState<String[]>([])
    const fetcher = useFetcher()

    const chartOptions: ApexOptions = merge(BaseOptionChart(), {
        stroke: { width: [0, 2, 3] },
        plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
        fill: { type: ['solid', 'gradient', 'solid'] },
        labels: labels,
        xaxis: { type: 'datetime' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `${toIdrFormatNumber(y.toFixed(0))}`;
                    }
                    return y;
                }
            }
        }
    });

    const getDonationsLastYear = async () => {
        try {
            const response = await fetcher(`${API_URL}/summary/donations`)
            setLabels(response.data.data.labels)
            setDonationsTotalLastYear(response.data.data.donationsCounts)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDonationsLastYear()
    }, [])

    const chatData = [
        {
            ...CHART_DATA[0],
            data: donationTotalLastYear
        }
    ]

    return (
        <Card>
            <CardHeader title="Donation" subheader="(+43%) than last year" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart
                    type="line"
                    series={chatData}
                    options={chartOptions}
                    height={364}
                />
            </Box>
        </Card>
    );
};

export default AppWebsiteVisits;
