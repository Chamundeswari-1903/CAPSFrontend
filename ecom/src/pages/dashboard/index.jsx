import React from 'react';
import Card from "../../components/ui/Card";
import GroupChart1 from "../../components/partials/widget/chart/group-chart-1";

import HomeBredCurbs from './HomeBredCurbs';
import SubscriberDetails from '../../components/partials/Table/react-table-Subscribers';



const Dashboard = () => {
  return (
    <div>
      <HomeBredCurbs title="Happy Customers List " />
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="2xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
          <Card bodyClass="p-4">
            <div className="">
              <GroupChart1 />
            </div>
          </Card>
        </div>
      </div>
      <div>
      <SubscriberDetails />
      </div>
      
    </div>
  )
}

export default Dashboard;