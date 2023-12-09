import React from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
Highcharts3D(Highcharts);
import { HighchartsReact } from 'highcharts-react-official';
import styles from '@/styles/Overview.module.scss';

const ByCourse = () => {
    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 2,
                beta: 20,
                viewDistance: 25,
                depth: 80
            },
        },
        title: {
            text: 'Chỉ số CV theo bộ môn',
            align: 'left'
        },
        subtitle: {
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: ['Web', 'UI/UX', 'Data'],
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        legend: {
            symbolRadius: 0
        },
        series: [
            {
                type: 'column',
                name: 'Tổng',
                data: [406292, 260000, 107000]
            },
            {
                type: 'column',
                name: 'Pass',
                data: [51086, 136000, 5500]
            }
        ]
    }
    return (
        <div className={styles.courseColumn}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default ByCourse