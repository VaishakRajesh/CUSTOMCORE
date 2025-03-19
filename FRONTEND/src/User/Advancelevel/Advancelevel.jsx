import React, { useEffect, useState } from "react";
import Style from "./Advancelevel.module.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import InfoIcon from '@mui/icons-material/Info';
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const steps = ["CPU", "GPU", "RAM", "Storage", "Power Supply", "Case", "Cooler", "Motherboard", "FINAL"];

const Advancelevel = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [age, setAge] = useState(''); // CPU
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
    const [pcBuilder, setPcBuilder] = useState('');
    const [PcBuilderarray, setPcBuilderarray] = useState([]);

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
    const handleComplete = () => {
        setCompleted({ ...completed, [activeStep]: true });
        handleNext();
    };
    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const handleChange = (event) => setAge(event.target.value);
    const handleChange1 = (event) => setGraphiccard(event.target.value);
    const handleChange2 = (event) => setRam(event.target.value);
    const handleChange3 = (event) => setStorage(event.target.value);
    const handleChange4 = (event) => setSMPS(event.target.value);
    const handleChange5 = (event) => setCase(event.target.value);
    const handleChange6 = (event) => setCooler(event.target.value);
    const handleChange7 = (event) => setMotherboard(event.target.value);
    const handleChange8 = (event) => setPcBuilder(event.target.value);

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

    const fetchPcBuilder = () => {
        axios.get("http://localhost:5000/collectionPcBulider")
            .then((response) => setPcBuilderarray(response.data.pcbulider))
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
        fetchPcBuilder();
    }, []);

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
                                        value={age}
                                        onChange={handleChange}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        <MenuItem value=""><em style={{ color: "white" }}>None</em></MenuItem>
                                        <MenuItem value={10} sx={{ color: "white" }}>Ten</MenuItem>
                                        <MenuItem value={20} sx={{ color: "white" }}>Twenty</MenuItem>
                                        <MenuItem value={30} sx={{ color: "white" }}>Thirty</MenuItem>
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
                        <div className={Style.imgbox}>

                        </div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the RAM</div>
                            <div className={Style.select}>
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 200, width: "250px", color: "white" }} // Increased width
                                >
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                        sx={{ color: "white" }} // White label text
                                    >
                                        RAM
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={ram}
                                        onChange={handleChange2}
                                        label="RAM"
                                        sx={{
                                            width: "100%", // Expands select width
                                            color: "white", // White text
                                            // backgroundColor: "black", // Black background
                                            "& .MuiSvgIcon-root": { color: "white" }, // White dropdown arrow
                                            "& .MuiInputBase-input": { color: "white" }, // White input text
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: "black", // Dropdown black
                                                    color: "white", // Dropdown text white
                                                    width: "200px", // Dropdown width increased
                                                },
                                            },
                                        }}
                                    >

                                        {RAMarray && RAMarray.map((RAM, index) => (
                                            <MenuItem
                                                key={index}
                                                value={RAM._id}
                                                sx={{
                                                    color: 'white',  // Ensures text is visible 
                                                    backgroundColor: "black", // Matches dropdown styling
                                                    "&:hover": { backgroundColor: "#333" } // Slight hover effect
                                                }}
                                            >
                                                {RAM.ramName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>)}
                {activeStep === 3 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}>

                        </div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the Storage</div>
                            <div className={Style.select}>
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 200, width: "250px", color: "white" }} // Increased width
                                >
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                        sx={{ color: "white" }} // White label text
                                    >
                                        Storage
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={Storage}
                                        onChange={handleChange3}
                                        label="Age"
                                        sx={{
                                            width: "100%", // Expands select width
                                            color: "white", // White text
                                            // backgroundColor: "black", // Black background
                                            "& .MuiSvgIcon-root": { color: "white" }, // White dropdown arrow
                                            "& .MuiInputBase-input": { color: "white" }, // White input text
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: "black", // Dropdown black
                                                    color: "white", // Dropdown text white
                                                    width: "200px", // Dropdown width increased
                                                },
                                            },
                                        }}
                                    >
                                        {Storagearray && Storagearray.map((Storage, index) => (
                                            <MenuItem
                                                key={index}
                                                value={Storage._id}
                                                sx={{
                                                    color: 'white',  // Ensures text is visible 
                                                    backgroundColor: "black", // Matches dropdown styling
                                                    "&:hover": { backgroundColor: "#333" } // Slight hover effect
                                                }}
                                            >
                                                {Storage.storageName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>)}
                {activeStep === 4 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}>

                        </div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the Power Supply</div>
                            <div className={Style.select}>
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 200, width: "250px", color: "white" }} // Increased width
                                >
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                        sx={{ color: "white" }} // White label text
                                    >
                                        Power Supply
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={SMPS}
                                        onChange={handleChange4}
                                        label="Age"
                                        sx={{
                                            width: "100%", // Expands select width
                                            color: "white", // White text
                                            // backgroundColor: "black", // Black background
                                            "& .MuiSvgIcon-root": { color: "white" }, // White dropdown arrow
                                            "& .MuiInputBase-input": { color: "white" }, // White input text
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: "black", // Dropdown black
                                                    color: "white", // Dropdown text white
                                                    width: "200px", // Dropdown width increased
                                                },
                                            },
                                        }}
                                    >
                                        {SMPSarray && SMPSarray.map((Smps, index) => (
                                            <MenuItem
                                                key={index}
                                                value={Smps._id}
                                                sx={{
                                                    color: 'white',  // Ensures text is visible 
                                                    backgroundColor: "black", // Matches dropdown styling
                                                    "&:hover": { backgroundColor: "#333" } // Slight hover effect
                                                }}
                                            >
                                                {Smps.smpsName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>)}
                {activeStep === 5 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}>

                        </div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the Case</div>
                            <div className={Style.select}>
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 200, width: "250px", color: "white" }} // Increased width
                                >
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                        sx={{ color: "white" }} // White label text
                                    >
                                        Case
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={Case}
                                        onChange={handleChange5}
                                        label="Age"
                                        sx={{
                                            width: "100%", // Expands select width
                                            color: "white", // White text
                                            // backgroundColor: "black", // Black background
                                            "& .MuiSvgIcon-root": { color: "white" }, // White dropdown arrow
                                            "& .MuiInputBase-input": { color: "white" }, // White input text
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: "black", // Dropdown black
                                                    color: "white", // Dropdown text white
                                                    width: "200px", // Dropdown width increased
                                                },
                                            },
                                        }}
                                    >
                                        {Casearray && Casearray.map((Case, index) => (
                                            <MenuItem
                                                key={index}
                                                value={Case._id}
                                                sx={{
                                                    color: 'white',  // Ensures text is visible 
                                                    backgroundColor: "black", // Matches dropdown styling
                                                    "&:hover": { backgroundColor: "#333" } // Slight hover effect
                                                }}
                                            >
                                                {Case.caseName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>)}
                {activeStep === 6 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}>

                        </div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the Cooler</div>
                            <div className={Style.select}>
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 200, width: "250px", color: "white" }} // Increased width
                                >
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                        sx={{ color: "white" }} // White label text
                                    >
                                        Cooler
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={Cooler}
                                        onChange={handleChange6}
                                        label="Age"
                                        sx={{
                                            width: "100%", // Expands select width
                                            color: "white", // White text
                                            // backgroundColor: "black", // Black background
                                            "& .MuiSvgIcon-root": { color: "white" }, // White dropdown arrow
                                            "& .MuiInputBase-input": { color: "white" }, // White input text
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: "black", // Dropdown black
                                                    color: "white", // Dropdown text white
                                                    width: "200px", // Dropdown width increased
                                                },
                                            },
                                        }}
                                    >
                                        {Coolerarray && Coolerarray.map((Cooler, index) => (
                                            <MenuItem
                                                key={index}
                                                value={Cooler._id}
                                                sx={{
                                                    color: 'white',  // Ensures text is visible 
                                                    backgroundColor: "black", // Matches dropdown styling
                                                    "&:hover": { backgroundColor: "#333" } // Slight hover effect
                                                }}
                                            >
                                                {Cooler.coolerName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>)}
                {activeStep === 7 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}>

                        </div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the MotherBoard</div>
                            <div className={Style.select}>
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 200, width: "250px", color: "white" }} // Increased width
                                >
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                        sx={{ color: "white" }} // White label text
                                    >
                                        MotherBoard
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={Motherboard}
                                        onChange={handleChange7}
                                        label="Age"
                                        sx={{
                                            width: "100%", // Expands select width
                                            color: "white", // White text
                                            // backgroundColor: "black", // Black background
                                            "& .MuiSvgIcon-root": { color: "white" }, // White dropdown arrow
                                            "& .MuiInputBase-input": { color: "white" }, // White input text
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: "black", // Dropdown black
                                                    color: "white", // Dropdown text white
                                                    width: "200px", // Dropdown width increased
                                                },
                                            },
                                        }}
                                    >
                                        {Motherboardarray && Motherboardarray.map((Motherboard, index) => (
                                            <MenuItem
                                                key={index}
                                                value={Motherboard._id}
                                                sx={{
                                                    color: 'white',  // Ensures text is visible 
                                                    backgroundColor: "black", // Matches dropdown styling
                                                    "&:hover": { backgroundColor: "#333" } // Slight hover effect
                                                }}
                                            >
                                                {Motherboard.motherboardName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>)}
                {activeStep === 8 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}></div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the PC Builder</div>
                            <div className={Style.select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200, width: "250px" }}>
                                    <InputLabel sx={{ color: "white" }}>PC Builder</InputLabel>
                                    <Select
                                        value={pcBuilder}
                                        onChange={handleChange8}
                                        sx={{ width: "100%", color: "white", "& .MuiSvgIcon-root": { color: "white" }, "& .MuiInputBase-input": { color: "white" } }}
                                        MenuProps={{ PaperProps: { sx: { backgroundColor: "black", color: "white", width: "200px" } } }}
                                    >
                                        {PcBuilderarray.map((item) => (
                                            <MenuItem key={item._id} value={item._id} sx={{ color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
                                                {item.PcBuliderName} {/* Adjust based on your API response */}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
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