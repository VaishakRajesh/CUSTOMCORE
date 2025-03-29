import React, { useEffect, useState } from "react";
import Style from "./Advancelevel.module.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import InfoIcon from '@mui/icons-material/Info';
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const steps = ["CPU", "GPU", "RAM", "Storage", "Power Supply", "Case", "Cooler", "Motherboard", "FINAL"];

const Advancelevel = () => {
    const { id } = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [cpu, setcpu] = useState('');
    const [cpuarray, setcpuarray] = useState([]);
    const [graphiccard, setGraphiccard] = useState('');
    const [Graphiccardarray, setGraphiccardarray] = useState([]);
    const [ram, setRam] = useState('');
    const [RAMarray, setRAMarray] = useState([]);
    const [storage, setStorage] = useState('');
    const [Storagearray, setStoragearray] = useState([]);
    const [SMPS, setSMPS] = useState('');
    const [SMPSarray, setSMPSarray] = useState([]);
    const [Case, setCase] = useState('');
    const [Casearray, setCasearray] = useState([]);
    const [Cooler, setCooler] = useState('');
    const [Coolerarray, setCoolerarray] = useState([]);
    const [Motherboard, setMotherboard] = useState('');
    const [Motherboardarray, setMotherboardarray] = useState([]);

    
    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleStep = (step) => () => setActiveStep(step);
    console.log(Motherboard)
    console.log(storage)
    console.log(ram)
    console.log(graphiccard)
    console.log(Cooler)
    console.log(Case)
    console.log(id)
    console.log(sessionStorage.getItem('uid'))
    const handleComplete = () => {
        
        const data = {
            cpuId:cpu,
            smpsId:SMPS,
            motherboardId: Motherboard,
            storageId: storage,
            ramId: ram,
            graphiccardId: graphiccard,
            coolerId: Cooler,
            CaseId: Case,
            pcBuliderId: id,
            userId: sessionStorage.getItem('uid')
        };
    
        axios.post("http://localhost:5000/collectioncustom", data)
            .then((response) => {
                console.log(response);
                alert("Insert Successfully"); // Replaced seterrors with alert
            })
            .catch((err) => {
                console.log(err);
                alert("Data already exists"); // Replaced seterrors with alert
            });
    };
    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const handleChange = (event) => setcpu(event.target.value);
    const handleChange1 = (event) => setGraphiccard(event.target.value);
    const handleChange2 = (event) => setRam(event.target.value);
    const handleChange3 = (event) => setStorage(event.target.value);
    const handleChange4 = (event) => setSMPS(event.target.value);
    const handleChange5 = (event) => setCase(event.target.value);
    const handleChange6 = (event) => setCooler(event.target.value);
    const handleChange7 = (event) => setMotherboard(event.target.value);

    const fetchCPU = () => {
        axios.get("http://localhost:5000/collectionCpu")
            .then((response) => setcpuarray(response.data.cpu))
            .catch((err) => console.log(err));
    };
    const fetchGPU = () => {
        axios.get("http://localhost:5000/collectionGraphiccard")
            .then((response) => setGraphiccardarray(response.data.graphiccard))
            .catch((err) => console.log(err));
    };

    const fetchRAM = () => {
        axios.get("http://localhost:5000/collectionRam")
            .then((response) => setRAMarray(response.data.ram))
            .catch((err) => console.log(err));
    };

    const fetchStorage = () => {
        axios.get("http://localhost:5000/collectionStorage")
            .then((response) => setStoragearray(response.data.storage))
            .catch((err) => console.log(err));
    };

    const fetchSMPS = () => {
        axios.get("http://localhost:5000/collectionSMPS")
            .then((response) => setSMPSarray(response.data.smps))
            .catch((err) => console.log(err));
    };

    const fetchCase = () => {
        axios.get("http://localhost:5000/collectionCase")
            .then((response) => setCasearray(response.data.cases))
            .catch((err) => console.log(err));
    };

    const fetchCooler = () => {
        axios.get("http://localhost:5000/collectionCooler")
            .then((response) => setCoolerarray(response.data.cooler))
            .catch((err) => console.log(err));
    };

    const fetchMotherboard = () => {
        axios.get("http://localhost:5000/collectionMotherboard")
            .then((response) => setMotherboardarray(response.data.motherboard))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchGPU();
        fetchRAM();
        fetchStorage();
        fetchSMPS();
        fetchCase();
        fetchCooler();
        fetchMotherboard();
        fetchCPU();
    }, []);

    // Helper functions to get component names from IDs
    const getComponentName = (id, array, nameKey) => {
        const item = array.find((comp) => comp._id === id);
        return item ? item[nameKey] : "Not Selected";
    };

    return (
        <div>
            <div className={Style.body}>
                <div className={Style.progessbar}>
                    <Box sx={{ width: "100%", mt: 3 }}>
                        <Stepper nonLinear activeStep={activeStep} sx={{
                            backgroundColor: "transparent",
                            padding: "10px",
                            "& .MuiStepConnector-line": { borderColor: "white" },
                        }}>
                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton
                                        color="inherit"
                                        sx={{
                                            color: "white",
                                            "& .MuiStepLabel-label": {
                                                fontSize: "18px",
                                                color: "white !important",
                                            },
                                            "& .MuiStepIcon-root": {
                                                fontSize: "2.5rem",
                                                color: completed[index] ? "lightblue" : "white",
                                            },
                                        }}
                                    >
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>

                {activeStep === 0 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}></div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the CPU</div>
                            <div className={Style.select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200, width: "250px" }}>
                                    <InputLabel sx={{ color: "white" }}>CPU</InputLabel>
                                    <Select
                                        value={cpu}
                                        onChange={handleChange}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        {cpuarray.map((item) => (
                                            <MenuItem key={item._id} value={item._id} sx={{ color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
                                                {item.cpuName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 1 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}></div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the GPU</div>
                            <div className={Style.select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200, width: "250px" }}>
                                    <InputLabel sx={{ color: "white" }}>GPU</InputLabel>
                                    <Select
                                        value={graphiccard}
                                        onChange={handleChange1}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        {Graphiccardarray.map((item) => (
                                            <MenuItem key={item._id} value={item._id} sx={{ color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
                                                {item.graphiccardName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 2 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}></div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the RAM</div>
                            <div className={Style.select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200, width: "250px" }}>
                                    <InputLabel sx={{ color: "white" }}>RAM</InputLabel>
                                    <Select
                                        value={ram}
                                        onChange={handleChange2}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        {RAMarray.map((RAM) => (
                                            <MenuItem key={RAM._id} value={RAM._id} sx={{ color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
                                                {RAM.ramName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 3 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}></div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the Storage</div>
                            <div className={Style.select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200, width: "250px" }}>
                                    <InputLabel sx={{ color: "white" }}>Storage</InputLabel>
                                    <Select
                                        value={storage}
                                        onChange={handleChange3}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        {Storagearray.map((Storage) => (
                                            <MenuItem key={Storage._id} value={Storage._id} sx={{ color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
                                                {Storage.storageName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 4 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}></div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the Power Supply</div>
                            <div className={Style.select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200, width: "250px" }}>
                                    <InputLabel sx={{ color: "white" }}>Power Supply</InputLabel>
                                    <Select
                                        value={SMPS}
                                        onChange={handleChange4}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        {SMPSarray.map((Smps) => (
                                            <MenuItem key={Smps._id} value={Smps._id} sx={{ color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
                                                {Smps.smpsName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 5 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}></div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the Case</div>
                            <div className={Style.select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200, width: "250px" }}>
                                    <InputLabel sx={{ color: "white" }}>Case</InputLabel>
                                    <Select
                                        value={Case}
                                        onChange={handleChange5}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        {Casearray.map((Case) => (
                                            <MenuItem key={Case._id} value={Case._id} sx={{ color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
                                                {Case.caseName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 6 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}></div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the Cooler</div>
                            <div className={Style.select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200, width: "250px" }}>
                                    <InputLabel sx={{ color: "white" }}>Cooler</InputLabel>
                                    <Select
                                        value={Cooler}
                                        onChange={handleChange6}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        {Coolerarray.map((Cooler) => (
                                            <MenuItem key={Cooler._id} value={Cooler._id} sx={{ color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
                                                {Cooler.coolerName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 7 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}></div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the Motherboard</div>
                            <div className={Style.select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200, width: "250px" }}>
                                    <InputLabel sx={{ color: "white" }}>Motherboard</InputLabel>
                                    <Select
                                        value={Motherboard}
                                        onChange={handleChange7}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        {Motherboardarray.map((Motherboard) => (
                                            <MenuItem key={Motherboard._id} value={Motherboard._id} sx={{ color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
                                                {Motherboard.motherboardName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 8 && (
                    <div className={Style.selectbody}>
                        <div className={Style.summary}>
                            <h2>Your PC Build Summary</h2>
                            <div className={Style.summaryItem}>
                                <strong>CPU:</strong> <span>{getComponentName(cpu, cpuarray, "cpuName")}</span>
                            </div>
                            <div className={Style.summaryItem}>
                                <strong>GPU:</strong> <span>{getComponentName(graphiccard, Graphiccardarray, "graphiccardName")}</span>
                            </div>
                            <div className={Style.summaryItem}>
                                <strong>RAM:</strong> <span>{getComponentName(ram, RAMarray, "ramName")}</span>
                            </div>
                            <div className={Style.summaryItem}>
                                <strong>Storage:</strong> <span>{getComponentName(storage, Storagearray, "storageName")}</span>
                            </div>
                            <div className={Style.summaryItem}>
                                <strong>Power Supply:</strong> <span>{getComponentName(SMPS, SMPSarray, "smpsName")}</span>
                            </div>
                            <div className={Style.summaryItem}>
                                <strong>Case:</strong> <span>{getComponentName(Case, Casearray, "caseName")}</span>
                            </div>
                            <div className={Style.summaryItem}>
                                <strong>Cooler:</strong> <span>{getComponentName(Cooler, Coolerarray, "coolerName")}</span>
                            </div>
                            <div className={Style.summaryItem}>
                                <strong>Motherboard:</strong> <span>{getComponentName(Motherboard, Motherboardarray, "motherboardName")}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={Style.button}>
                    {activeStep !== 0 && (
                        <button className={Style.prevButton} onClick={handleBack}>Previous</button>
                    )}
                    {activeStep !== 8 && (
                        <button className={Style.nextButton} onClick={handleNext}>Next</button>
                    )}
                    {activeStep === 8 && (
                        <button className={Style.nextButton} onClick={handleComplete}>Finish</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Advancelevel;