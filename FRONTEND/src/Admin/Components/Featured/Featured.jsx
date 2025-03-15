import React from 'react'
import Styles from './Featured.module.css'
import { KeyboardArrowDown, MoreVert } from '@mui/icons-material'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/Styles.css'
const Featured = () => {
  return (
    <div className={Styles.Featured}>
      <div className={Styles.top}>
        <h1 className={Styles.title}>
          Total Revenue
        </h1>
        <MoreVert fontSize='small' />
      </div>
      <div className={Styles.bottom}>
        <div className={Styles.featurechart}>
          <CircularProgressbar value={70} text='70%' strokeWidth={3} />
          <p className={Styles.title}>Total sale made today</p>
          <p className={Styles.amount}>$420</p>
          <p className={Styles.desc}>
            last payment may not be included.
          </p>
          <div className={Styles.summary}>
            <div className={Styles.item}>
              <div className={Styles.itemtitle}>Target</div>
              <div className={Styles.itemresult}>
                <KeyboardArrowDown fontSize='small'/>
                <div className={Styles.resultamount}>$12.4k</div>
              </div>
            </div>
            <div className={Styles.item}>
              <div className={Styles.itemtitle}>Target</div>
              <div className={Styles.itemresult}>
                <KeyboardArrowDown fontSize='small'/>
                <div className={Styles.resultamount}>$12.4k</div>
              </div>
            </div>
            <div className={Styles.item}>
              <div className={Styles.itemtitle}>Target</div>
              <div className={Styles.itemresult}>
                <KeyboardArrowDown fontSize='small'/>
                <div className={Styles.resultamount}>$12.4k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured