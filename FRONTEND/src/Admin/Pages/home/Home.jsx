import React from 'react'
import Styles from './Home.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Widgets from '../../Components/Widgets/Widgets'
import Featured from '../../Components/Featured/Featured'
import Charts from '../../Components/Charts/Charts'
import Table from '../../Components/Table/Table'
const Home = () => {
  return (
    <div className={Styles.Body}>
      <Sidebar/>
      <div className={Styles.Container}>
        <Navbar/>
        <div className={Styles.Widgets}>
          <Widgets type="user"/>
          <Widgets type="order"/>
          <Widgets type="earning"/>
          <Widgets type="balance"/>
        </div>
        <div className={Styles.charts}>
        <Featured/>
        <Charts/>
        </div>
        <div className={Styles.listcontainer}>
          <div className={Styles.listtitle}>Latest Transactions</div>
          <Table/>
        </div>
      </div>
        </div>
  )
}
export default Home