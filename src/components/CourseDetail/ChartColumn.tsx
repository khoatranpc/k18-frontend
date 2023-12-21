import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from '@/styles/course/ManagerCourse.module.scss';

const ChartColumn = () => {
    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            height: '20%'
        },
        title: {
            text: '',
            align: 'left'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ["LV1", "LV2", "LV3", "LV4"],
            labels: {
                enabled: false
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: false
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                },
            }
        },
        series: [{
            name: 'Lớp',
            type: 'column',
            data: [
                {
                    y: 10,
                    color: 'red'
                },
                {
                    y: 10,
                    color: 'red'
                },
                {
                    y: 10,
                    color: 'red'
                },
            ],
            colorByPoint: true,
            dataLabels: {
                enabled: false
            }
        }]
    }
    return (
        <div className={styles.chart}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default ChartColumn;