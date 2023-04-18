import { useEffect } from "react"
import { useState } from "react"
import * as React from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import BinanceServices from '../_services/binance';
import { Colors } from "../styles/colors";


const CryptoGraph = ({value, pair, height, time, width} : {value: number, pair: string, height: number, time: number, width : number}) => {
    const Binance = new BinanceServices();
    // PREND EN PROPS LE NOM DE LA PAIRE EX : BTCUSD, BTCBUSD ...
    const [series, setSeries] = useState<ApexAxisChartSeries>([{data : []}])
    const [color , setColor] = useState<string>(value < 0 ? Colors.RED : Colors.GREEN)
    const [dataC, setdataC] = useState<ApexCharts.ApexOptions>({
        series: series,
        colors: [color, color, color],
        stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'round',
            colors: undefined,
            width: 1,
            dashArray: 0
        },
        dataLabels: {
            enabled: false
        },
        chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            align: 'left'
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: false
            },
        },
        yaxis: {
            labels: {
                show: false
            },
            tooltip: {
                enabled: false
            }
        },
        grid: {
            show: true,      // you can either change hear to disable all grids
            xaxis: {
                lines: {
                    show: false  //or just here to disable only x axis grids
                }
            },
            yaxis: {
                lines: {
                    show: false  //or just here to disable only y axis
                }
            },
        },
    })


    useEffect(() => {

        let mountain = true

        if(mountain) {
            getCryptoListData();
        }

    }, [])


    const getCryptoListData = () => {
        if (time !== undefined) {
            Binance.getMarketData(pair, "1h", time).then((res) => {
                var obj: ApexCharts.ApexOptions;
                obj = { ...dataC }

                const newSeries: ApexAxisChartSeries = {...series};
                newSeries[0].data = [];

                for (let item of res.data) {
                    // @ts-ignore
                    newSeries[0].data.push({
                        x: new Date(item[0]),
                        y: [item[1], item[2], item[3], item[4]]
                    })
                }

                 setSeries(newSeries);
            })
        }
    }

    return (
        <div>
            {series[0].data.length > 0 ? width != null ? <ApexCharts options={dataC} series={dataC.series} type="area" width={width} height={height}/> : <ApexCharts options={dataC} series={dataC.series} type="area" height={height}/> : null}
        </div>
    )
}

export default CryptoGraph;
