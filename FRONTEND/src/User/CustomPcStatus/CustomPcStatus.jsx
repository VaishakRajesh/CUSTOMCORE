import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Style from './CustomPcStatus.module.css';
  const CustomPcStatus = () => {
    const [custom, setCustom] = useState([]);
    useEffect(() => {
      const userId = sessionStorage.getItem('uid');
      console.log('User ID from session storage:', userId);
      CustomPc(userId);
   }, []);
   
const CustomPc = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/collectionCustomByUser/${userId}`);
    setCustom(response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching custom builds:', error);
  }
};
console.log(custom)
  return (
    <div className={Style.body}>
      <div className={Style.statusBox}>
        <h2 className={Style.title}>PC Build Status</h2>
        <div className={Style.progressBar}>
          <div className={Style.progress} style={{ width: '70%' }}>70%</div>
        </div>
        {custom.map((item) => (
        <ul className={Style.statusList}>
          <li className={Style.item}><span className={Style.check}>✔</span> {item.customStatus}</li>

        </ul>
      )  )}
      </div>
    </div>
  );
};

export default CustomPcStatus;
