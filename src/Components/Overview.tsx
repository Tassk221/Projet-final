import StatsCards from "../Components/StatsCards.tsx";
import TotalUsers from "../Components/Total_Users.tsx";
import TrafficByDevices from "../Components/TraficByDevices.tsx";
import TrafficByLocation from "../Components/TrafficByLocation.tsx";
import vec from '../assets/Icon.svg'
import fle from '../assets/Vector.svg'

export default function Overview() {
    return(
        <div className="ml-54 min-h-screen bg-white px-6 pt-21 dark:bg-gray-950">
            <div>
                <h2 className="text-black font-bold">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-auto gap-4">
                    <StatsCards title = "Views" value = "7,232" color = "bg-blue-100" percent="+11,2%" icon={vec} />
                    <StatsCards title = "Visits" value = "3,537" color = "bg-purple-100" percent="2.2%" icon={fle}/>
                    <StatsCards title = "New Users" value = "396" color = "bg-orange-100" percent="3.7%" icon={vec}/>
                    <StatsCards title = "Active Users" value = "1232" color = "bg-red-100" percent="+4,3%" icon={vec}/>
                </div>
            </div>
            <TotalUsers isDark={false} />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-4  gap-4" >
                <div className=" rounded-2xl dark:bg-gray-950 p-4 shadow-sm ">
                    <TrafficByDevices isDark={false}/>
                </div>
                <div className=" rounded-2xl dark:bg-gray-950 p-4 shadow-sm">
                    <TrafficByLocation isDark={false}/>
                </div>
            </div>

        </div>

    );
}
