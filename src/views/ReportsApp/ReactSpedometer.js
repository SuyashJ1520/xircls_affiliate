import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

const ReactSpedometer = () => {
    const [speed, setSpeed] = useState(0)

    useEffect(() => {
        // Simulating dynamic data updates
        const interval = setInterval(() => {
            // Update speed value dynamically (e.g., from an API or some external source)
            const newSpeed = 68
            setSpeed(newSpeed)
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    const options = {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -120,
                endAngle: 60,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: '#fff',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 0,
                        left: 0,
                        blur: 3,
                        opacity: 0.5
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            color: '#0000'
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['Low', 'Medium', 'High', 'Very High', 'Extreme']
    }

    const series = [speed]

    return (
        <div style={{ position: 'relative' }}>
            <ReactApexChart options={options} series={series} type="radialBar" height={350} />
            <svg width="300" height="40" viewBox="0 0 360 46" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '150px', left: '50%', transform: 'translateX(-50%)' }}><link xmlns="" type="text/css" id="dark-mode" rel="stylesheet" href="" /><style xmlns="" type="text/css" id="dark-mode-custom-style" />
                <ellipse cx="180" cy="22.4993" rx="18.5" ry="18" transform="rotate(-90 180 22.4993)" fill="black" />
                <path d="M8.87853 20.878C7.70695 22.0496 7.70695 23.9491 8.87853 25.1206L27.9704 44.2125C29.142 45.3841 31.0415 45.3841 32.213 44.2125C33.3846 43.041 33.3846 41.1415 32.213 39.9699L15.2425 22.9993L32.213 6.02877C33.3846 4.85719 33.3846 2.9577 32.213 1.78613C31.0415 0.614554 29.142 0.614554 27.9704 1.78613L8.87853 20.878ZM180 19.9993L10.9998 19.9993L10.9998 25.9993L180 25.9993L180 19.9993Z" fill="black" />
            </svg>
        </div>
    )
}

export default ReactSpedometer