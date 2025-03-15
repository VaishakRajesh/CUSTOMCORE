import React, { useState } from 'react'
import Style from './Select.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import MotherBoard from '../MotherBoard/MotherBoard'
import Types from '../Types/Types'
import Ram from '../Ram/Ram'
import Storage from '../Storage/Storage'
import Company from '../Company/Company'
import GraphicCard from '../GraphicCard/GraphicCard'
import SMPS from '../SMPS/SMPS'
import Cooler from '../Cooler/Cooler'
import Case from '../Case/Case'
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import TypesReport from '../Report/TypesReport/TypesReport'
import StorageReport from '../Report/StorageReport/StorageReport'
import CompanyReport from '../Report/CompanyReport/CompanyReport'
import GraphicCardReport from '../Report/GraphicCardReport/GraphicCardReport'
import CoolerReport from '../Report/CoolerReport/CoolerReport'
import CaseReport from '../Report/CaseReport/CaseReport'
import MotherBoardReport from '../Report/MotherBoardReport/MotherBoardReport'
import RamReport from '../Report/RamReport/RamReport'
import SMPSReport from '../Report/SMPSReport/SMPSReport'
import CPU from '../CPU/CPU'
import CPUReport from '../Report/CPUReport/CPUReport'
const Select = () => {
    const [ActiveSection, setActiveSection] = useState('');
    const [Activebutton, setActivebutton] = useState('');


    return (
        <div className={Style.Body}>
            <Sidebar />
            <div className={Style.Container}>
                <Navbar />
                <div className={Style.Select}>
                    <div className={Style.Buttons}>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('Types')}
                            >Types</button>
                        </div>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('CPU')}
                            >CPU</button>
                        </div>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('Ram')}
                            >Ram</button>
                        </div>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('Storage')}
                            >Storage</button>
                        </div>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('MotherBoard')}
                            >MotherBoard</button>
                        </div>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('Company')}
                            >Company</button>
                        </div>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('GraphicCard')}
                            >GraphicCard</button>
                        </div>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('SMPS')}
                            >SMPS</button>
                        </div>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('Cooler')}
                            >Cooler</button>
                        </div>
                        <div className={Style.Button}>
                            <button onClick={() => setActiveSection('Case')}
                            >Case</button>
                        </div>
                    </div>
                    <div className={Style.changebutton} onClick={() => setActivebutton(Activebutton === 'insert' ? '' : 'insert')}><SwapVertOutlinedIcon /></div>
                    {ActiveSection === 'MotherBoard' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <MotherBoard />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <MotherBoardReport />
                            </div>
                        )
                    ) : null}
                    {ActiveSection === 'Types' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <Types />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <TypesReport/>
                            </div>
                        )
                    ) : null}
                    {ActiveSection === 'CPU' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <CPU />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <CPUReport/>
                            </div>
                        )
                    ) : null}
                     {ActiveSection === 'Ram' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <Ram />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <RamReport/>
                            </div>
                        )
                    ) : null}
                    {ActiveSection === 'Storage' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <Storage />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <StorageReport/>
                            </div>
                        )
                    ) : null}
                    {ActiveSection === 'Company' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <Company />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <CompanyReport/>
                            </div>
                        )
                    ) : null}
                    {ActiveSection === 'GraphicCard' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <GraphicCard />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <GraphicCardReport/>
                            </div>
                        )
                    ) : null}
                     {ActiveSection === 'SMPS' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <SMPS />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <SMPSReport/>
                            </div>
                        )
                    ) : null}
                    {ActiveSection === 'Cooler' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <Cooler />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <CoolerReport/>
                            </div>
                        )
                    ) : null}
                     {ActiveSection === 'Case' ? (
                        Activebutton === 'insert' ? (
                            <div className={Style.Dispaly}>
                                <Case />
                            </div>
                        ) : (
                            <div className={Style.Dispaly}>
                                <CaseReport/>
                            </div>
                        )
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Select