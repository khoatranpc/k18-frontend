import React from 'react';
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
Highcharts3D(Highcharts);
import styles from '@/styles/Overview.module.scss';

const PiResourceApply = () => {
    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Thống kê theo nguồn',
            align: 'left',
            y: 50
        },
        subtitle: {
            text: '',
            align: 'left'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Share',
            data: [
                ['Khác', 23],
                ['TopCV', 18],
                ['Facebook', 9],
                ['Refer', 8],
                ['Khác', 30],
                ['Linkedin', 30]
            ]
        }]
    }
    return (
        <div className={styles.pi3D}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default PiResourceApply;