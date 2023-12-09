import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from '@/styles/Overview.module.scss';

const Columns = () => {
    const options: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Số lượng Giảng viên, Mentor, Supporter',
            align: 'left'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Data', 'UI/UX', 'Web']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Giáo viên',
            type: 'column',
            color: '#DA4646',
            data: [15, 20, 1],
            dataLabels: {
                enabled: false
            }
        }, {
            name: 'Mentor',
            type: 'column',
            color: '#6792F4',
            data: [30, 25, 8],
            dataLabels: {
                enabled: false
            }
        }, {
            name: 'Supporter',
            type: 'column',
            data: [50, 30, 6],
            dataLabels: {
                enabled: false
            }
        }]
    }
    return (
        <div className={styles.columnsStatistic}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default Columns;