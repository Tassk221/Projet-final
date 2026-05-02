import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TrafficByLocation({isDark}: {isDark: boolean}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const chart = new Chart(canvasRef.current, {
            type: 'doughnut',
            data: {
                labels: ['Sénégal', 'Guinée', 'Gambie', 'Other'],
                datasets: [
                    {
                        data: [42, 23, 14, 21],
                        backgroundColor: ['#4F46E5', '#A5B4FC', '#818CF8', '#E0E7FF'],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: isDark ? '#fff' : '#000'
                        }
                    }
                }
            }

        });
        return () => chart.destroy();
    }, [isDark]);

        return (
            <div className="dark:bg-gray-800 rounded-2xl p-4 shadow-sm mt-4">
                <h2 className="dark:text-white font-bold text-lg mb-4">Traffic by Location</h2>
                <div style={{ height: '300px' }}>
                    <canvas ref={canvasRef} />
                </div>

            </div>
        );
}
