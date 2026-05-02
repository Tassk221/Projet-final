import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TrafficByDevices({isDark} : { isDark: boolean }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const chart = new Chart(canvasRef.current, {
            type: 'bar',
            data: {
                labels: ['Linux', 'Mac', 'iOS', 'Windows', 'Android', 'Other'],
                datasets: [
                    {
                        label: 'Traffic',
                        data: [41000, 10040, 24200, 20324, 60953, 32452],
                        backgroundColor: ['#4F46E5', '#A5B4FC', '#818CF8', '#6366F1', '#38BDF8', '#34D399'],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
            scales: {
                x: { ticks: { color: isDark ? '#fff' : '#000' } },
                y: { ticks: { color: isDark ? '#fff' : '#000' } },
            }
        });
        return () => chart.destroy();
    }, [isDark]);

    return (
        <div className=" rounded-2xl p-4 dark:bg-gray-800 shadow-sm mt-4">
            <h2 className="font-bold text-lg dark:text-white mb-4">Traffic by Device</h2>
            <div style={{ height: '300px' }}>
                <canvas ref={canvasRef} />
            </div>

        </div>
    );
}