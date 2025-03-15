import React from 'react'
import Style from './Single.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import List from '../../Components/Table/Table'
const Single = () => {
  return (
    <div className={Style.single}>
      <Sidebar />
      <div className={Style.Container}>
        <Navbar />
        <div className={Style.top}>
          <div className={Style.left}>
            <div className={Style.editbutton}>Edit</div>
            <h1 className={Style.title}>Information</h1>
            <div className={Style.item}>
              <img src="../src/img/1.png" alt="" className={Style.itemimg} />
              <div className={Style.detail}>
                <h1 className={Style.itemtitle}>Vaishak</h1>
                <div className={Style.detailitem}>
                  <spam className={Style.itemkey}>Email:</spam>
                  <spam className={Style.item}>vaishak@gmail.com</spam>
                </div>
              </div>
            </div>
          </div>
          <div className={Style.right}></div>
        </div>
        <div className={Style.bottom}>
        <h1 className={Style.title}>Information</h1>
        <List/></div>
      </div>
    </div>
  )
}

export default Single