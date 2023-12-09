import React from 'react';
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts';
import styles from '@/styles/Overview.module.scss';
import { FilterOutlined } from '@ant-design/icons';
import SelectBaseCourse from '@/components/SelectBaseCourse';

const PiStatistic = () => {
    const handleChangeCourse = (courseId: string) => {
        console.log(courseId);
    }
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
            text: 'Phân bổ giáo viên',
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
            name: 'Tỉ lệ',
            data: [
                ['Hà Nội', 23],
                ['Hồ Chí Minh', 18],
                ['Online', 9],
            ]
        }]
    }
    return (
        <div className={styles.teacherStatisticPiChart}>
            <div className={styles.filter}>
                <FilterOutlined />
                <SelectBaseCourse onChange={handleChangeCourse} />
            </div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default PiStatistic;