import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TrafficByDevices({ isDark } : { isDark: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const chart = new Chart(canvasRef.current, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar','Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    { label: 'This Year', data: [43000, 10000, 43200,34940, 34039,30420,21109,29393,22943,39309,95765,3594], borderColor: '#4F46E5' },
                    { label: 'Last Year', data: [53440, 33340, 52340,38393,48385,38572,22594,99284,93348,23942,34928,34953], borderColor: '#A5B4FC' },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { ticks: { color: isDark ? '#fff' : '#000' } },
                    y: { ticks: { color: isDark ? '#fff' : '#000' } },
                }
            },
        });
        return () => chart.destroy();
    }, [isDark]);

    return (
        <div className="rounded-2xl dark:bg-gray-800 p-4 shadow-sm mt-4">
            <h2 className="font-bold text-lg dark:text-white mb-4">Total Users</h2>
            <div style={{ height: '300px' }}>
                <canvas ref={canvasRef} />
            </div>

        </div>
    );
}
