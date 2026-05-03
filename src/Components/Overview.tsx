import StatsCards from "../Components/StatsCards.tsx";
import TotalUsers from "../Components/Total_Users.tsx";
import TrafficByDevices from "../Components/TraficByDevices.tsx";
import TrafficByLocation from "../Components/TrafficByLocation.tsx";
import vec from '../assets/Icon.svg'
import fle from '../assets/Vector.svg'

type OverviewProps = {
    isDark: boolean;
};

export default function Overview({ isDark }: OverviewProps) {
    return(
        <div className="min-h-screen bg-white px-4 pb-6 pt-20 dark:bg-gray-950 sm:px-6 lg:ml-54 lg:pt-21">
            <div>
                <h2 className="font-bold text-black dark:text-white">Overview</h2>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatsCards title = "Views" value = "7,232" color = "bg-blue-100" percent="+11,2%" icon={vec} />
                    <StatsCards title = "Visits" value = "3,537" color = "bg-purple-100" percent="2.2%" icon={fle}/>
                    <StatsCards title = "New Users" value = "396" color = "bg-orange-100" percent="3.7%" icon={vec}/>
                    <StatsCards title = "Active Users" value = "1232" color = "bg-red-100" percent="+4,3%" icon={vec}/>
                </div>
            </div>
            <TotalUsers isDark={isDark} />
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <TrafficByDevices isDark={isDark} />
                <TrafficByLocation isDark={isDark} />
            </div>

        </div>

    );
}
