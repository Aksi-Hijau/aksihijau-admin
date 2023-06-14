import React, { useEffect, useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
import { BaseOptionChart } from '@/components/charts';
import { ApexOptions } from 'apexcharts';
import useFetcher from '@/hooks/useFetcher';
import { API_URL } from '@/config/api.js'

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(2),
    '& .apexcharts-canvas svg': {
        height: CHART_HEIGHT
    },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [
    { name: 'Payment Method', data: [] },
];

const AppCurrentSubject = (): JSX.Element => {
    const theme = useTheme();
    const [categories, setCategories] = useState<String[]>([])
    const [count, setCount] = useState<Number[]>([])

    const fetcher = useFetcher()

    const chartOptions: ApexOptions = merge(BaseOptionChart(), {
        stroke: { width: 2 },
        fill: { opacity: 0.48 },
        legend: { floating: true, horizontalAlign: 'center' },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: [
                        theme.palette.text.secondary,
                        theme.palette.text.secondary,
                        theme.palette.text.secondary,
                        theme.palette.text.secondary,
                        theme.palette.text.secondary,
                        theme.palette.text.secondary
                    ]
                }
            }
        },
        yaxis: {
            show: false
        }
    });

    const getPaymentsDistributions = async () => {
        try {
            const response = await fetcher(`${API_URL}/payments/distributions`)
            setCategories(response.data.data.categories)
            setCount(response.data.data.count)
        } catch (error) {
            console.log(error)
        }
    }

    const chartData = [
        {
            ...CHART_DATA[0],
            data: count
        }
    ]

    useEffect(() => {
        getPaymentsDistributions()
    }, [])

    return (
        <Card>
            <CardHeader title="Payment Method Distribution" />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart
                    type="radar"
                    series={chartData}
                    options={chartOptions}
                    height={340}
                />
            </ChartWrapperStyle>
        </Card>
    );
};

export default AppCurrentSubject;
