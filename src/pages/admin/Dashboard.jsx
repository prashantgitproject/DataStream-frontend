import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import AdminLayout from '../../components/layout/AdminLayout'
import Loader from '../../components/shared/Loader'
import { Progress } from '@chakra-ui/react'
import { DoughnutChart, LineChart } from '../../components/shared/Chart'
import { useGetDashboardStatsQuery } from '../../redux/api/adminAPI'

const DataBox = ({title, qty, qtyPercentage, profit}) => (
  <div className="p-8 rounded-lg shadow-lg shadow-gray-500 bg-gray-100">
    <h4>{title}</h4>
    <div className="flex gap-4">
      <p className='text-2xl font-bold'>{qty}</p>
      <div className='flex'>
        <p className='text-lg font-bold'>{qtyPercentage}%</p>
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </div>
    </div>
    <p>Since Last Month</p>
  </div>
)

const Bar = ({title, value, profit}) => (
  <div className="p-4 rounded-lg shadow-lg shadow-gray-500 bg-gray-300">
    <h3 className='mb-2'>{title}</h3>
    <div className="flex gap-1 items-center">
      <h4>{profit ? '0%' : `-${value}%`}</h4>

      <Progress w="full" value={profit ? value : 0} colorScheme="purple" />
      <p>{`${value > 100 ? value : 100}%`}</p>
    </div>
  </div>
)

const Dashboard = () => {

  const {data, isLoading} = useGetDashboardStatsQuery();

  if (isLoading) return <Loader/>

  const { 
    stats,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  } = data;

  return (
    <AdminLayout>
      {isLoading || !stats ? <Loader/> : (
      <div className=''>
        <p className='text-center py-4'>Last change was on {String(new Date(stats[11].createdAt)).split('G')[0]}</p>
        <h2 className='text-xl font-bold ms-4'>Dashboard</h2>
        <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row md:justify-evenly p-8">
          <DataBox title="Views" qty={viewsCount} qtyPercentage={viewsPercentage} profit={viewsProfit}/>
          <DataBox title="Users" qty={usersCount} qtyPercentage={usersPercentage} profit={usersProfit}/>
          <DataBox title="Subscription" qty={subscriptionCount} qtyPercentage={subscriptionPercentage} profit={subscriptionProfit} />
        </div>
        <div className="mt-8 rounded-lg shadow-xl shadow-gray-500 p-4 mx-4 bg-gray-100">
          <h4 className='text-center'>Views Graph</h4>
          <LineChart views={stats.map(item => item.views)} />
        </div>
        <div className="md:grid md:grid-cols-12">
          <div className="col-span-7 p-4">
            <h4>Progress Bar</h4>
            <div className="flex flex-col gap-2">
              <Bar title="Views" value={viewsPercentage} profit={viewsProfit} />
              <Bar title="Users" value={usersPercentage} profit={usersProfit} />
              <Bar title="Subscription" value={subscriptionPercentage} profit={subscriptionProfit} />
            </div>
          </div>

          <div className="col-span-5 rounded-lg p-10 md:p-2 shadow-xl shadow-gray-500 m-10 bg-gray-100">
            <div className="">
              <h4 className='text-center'>Users</h4>
              <DoughnutChart
                users={[subscriptionCount, usersCount - subscriptionCount]}
              />
            </div>
          </div>
        </div>
      </div>
      )}
    </AdminLayout>
  )
}

export default Dashboard

