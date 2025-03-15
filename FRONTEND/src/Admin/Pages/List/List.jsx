import React from 'react'
import Styles from './List.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Datatable from '../../Components/Datatable/Datatable'
const List = () => {
  return (
    <div className={Styles.list}>
      <Sidebar/>
      <div className={Styles.listcontainer}>
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List