import React from 'react'
import Styles from './Home.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Widgets from '../../Components/Widgets/Widgets'
import Featured from '../../Components/Featured/Featured'
import Charts from '../../Components/Charts/Charts'
import Table from '../../Components/Table/Table'
import ViewBuilder from '../ViewBulider/ViewBulider'
const Home = () => {
  return (
    <>
      <div className={Styles.Widgets}>
        <Widgets type="totalUsers" />
        <Widgets type="pcBuilders" />
        <Widgets type="earning" />
        <Widgets type="balance" />
      </div>
      <div className={Styles.charts}>
        <ViewBuilder/>
        {/* <Featured /> */}
        {/* <Charts /> */}
      </div>
      <div className={Styles.listcontainer}>
        {/* <div className={Styles.listtitle}>Latest Transactions</div> */}
        {/* <Table /> */}
      </div>
    </>

  )
}
export default Home