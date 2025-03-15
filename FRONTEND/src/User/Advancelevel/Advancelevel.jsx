import React, { useEffect, useState } from "react";
import Style from "./Advancelevel.module.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserNavbar from "../UserNavbar/UserNavbar";
import InfoIcon from '@mui/icons-material/Info';
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const steps = ["CPU", "GPU", "RAM", "Storage", "Power Supply", "Case", "Cooler", "FINAL"];

const Advancelevel = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

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
    const [age, setage] = React.useState('');
    const handleChange = (event) => {
        setage(event.target.value);
    };

    const [graphiccard, setgraphiccard] = React.useState('');
    const handleChange1 = (event) => {
        setgraphiccard(event.target.value);
    };
    const [Graphiccardarray, setGraphiccardarray] = useState([])
    const fetchGPU = () => {
        axios.get("http://localhost:5000/collectionGraphiccard").then((response) => {
            console.log(response.data.graphiccard);
            setGraphiccardarray(response.data.graphiccard)
        })
    }
    const [ram, setram] = React.useState('');
    const handleChange2 = (event) => {
        setram(event.target.value);
    };
    const [RAMarray, setRAMarray] = useState([])
    const fetchRAM = () => {
        axios.get("http://localhost:5000/collectionRam").then((response) => {
            console.log(response.data.ram);
            setRAMarray(response.data.ram)
        })
    }
    const [Storage, setStorage] = React.useState('');
    const handleChange3 = (event) => {
        setStorage(event.target.value);
    };
    const [Storagearray, setStoragearray] = useState([])
    const fetchStorage = () => {
        axios.get("http://localhost:5000/collectionStorage").then((response) => {
            console.log(response.data.storage);
            setStoragearray(response.data.storage)
        })
    }
    const [SMPS, setSMPS] = React.useState('');
    const handleChange4 = (event) => {
        setSMPS(event.target.value);
    };
    const [SMPSarray, setSMPSarray] = useState([])
    const fetchSMPS = () => {
        axios.get("http://localhost:5000/collectionSMPS").then((response) => {
            console.log(response.data.smps);
            setSMPSarray(response.data.smps)
        })
    }
    const [Case, setCase] = React.useState('');
    const handleChange5 = (event) => {
        setCase(event.target.value);
    };
    const [Casearray, setCasearray] = useState([])
    const fetchCase = () => {
        axios.get("http://localhost:5000/collectionCase").then((response) => {
            console.log(response.data.cases);
            setCasearray(response.data.cases)
        })
    }
    const [Cooler, setCooler] = React.useState('');
    const handleChange6 = (event) => {
        setCooler(event.target.value);
    };
    const [Coolerarray, setCoolerarray] = useState([])
    const fetchCooler = () => {
        axios.get("http://localhost:5000/collectionCooler").then((response) => {
            console.log(response.data.cooler);
            setCoolerarray(response.data.cooler)
        })
    }
    useEffect(() => {
        fetchGPU();
        fetchRAM();
        fetchStorage();
        fetchSMPS();
        fetchCase();
        fetchCooler();
    }, [])
    return (
        <div>
            <UserNavbar />
            <div className={Style.body}>
                <div className={Style.progessbar}>
                    <Box sx={{ width: "100%", mt: 3 }}> {/* Stepper moved up */}
                        <Stepper
                            nonLinear
                            activeStep={activeStep}
                            sx={{
                                backgroundColor: "transparent",
                                padding: "10px",
                                "& .MuiStepConnector-line": {
                                    borderColor: "white",
                                },
                            }}
                        >
                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton
                                        color="inherit"
                                        // onClick={handleStep(index)}
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
                    {/* 
        <Box sx={{ textAlign: "center", mt: 4 }}>
          {allStepsCompleted() ? (
            <Typography sx={{ color: "white", fontSize: "20px", mb: 2 }}>
              All steps completed - You’re finished!
            </Typography>
          ) : (
            <Typography sx={{ color: "white", fontSize: "20px", mb: 2 }}>
              Step {activeStep + 1}: {steps[activeStep]}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ fontSize: "16px", color: "white", border: "1px solid white" }}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              sx={{ fontSize: "16px", color: "black", backgroundColor: "white" }}
            >
              Next
            </Button>
            {activeStep !== steps.length && !completed[activeStep] && (
              <Button onClick={handleComplete} sx={{ fontSize: "16px", color: "white", border: "1px solid white" }}>
                {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}
              </Button>
            )}
            {allStepsCompleted() && (
              <Button onClick={handleReset} sx={{ fontSize: "16px", color: "white", border: "1px solid white" }}>
                Reset
              </Button>
            )}
          </Box>
        </Box> */}
                </div>

                {activeStep === 0 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}>

                        </div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the CPU</div>
                            <div className={Style.select}>
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 200, width: "250px", color: "white" }} // Increased width
                                >
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                        sx={{ color: "white" }} // White label text
                                    >
                                        CPU
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={age}
                                        onChange={handleChange}
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
                                        <MenuItem value="">
                                            <em style={{ color: "white" }}>None</em>
                                        </MenuItem>
                                        <MenuItem value={10} sx={{ color: "white" }}>Ten</MenuItem>
                                        <MenuItem value={20} sx={{ color: "white" }}>Twenty</MenuItem>
                                        <MenuItem value={30} sx={{ color: "white" }}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>)}

                {activeStep === 1 && (
                    <div className={Style.selectbody}>
                        <div className={Style.imgbox}>

                        </div>
                        <div className={Style.selectbox}>
                            <div className={Style.Selecttext}>Select the GPU</div>
                            <div className={Style.select}>
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 200, width: "250px", color: "white" }}
                                >
                                    <InputLabel
                                        id="gpu-select-label"
                                        sx={{ color: "white" }}
                                    >
                                        GPU
                                    </InputLabel>
                                    <Select
                                        labelId="gpu-select-label"
                                        id="gpu-select"
                                        value={graphiccard}
                                        onChange={handleChange1}
                                        label="GPU"
                                        sx={{
                                            width: "100%",
                                            color: "white",
                                            "& .MuiSvgIcon-root": { color: "white" },
                                            "& .MuiInputBase-input": { color: "white" },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: "black",
                                                    color: "white !important",
                                                    width: "200px",
                                                },
                                            },
                                        }}
                                    >
                                        {Graphiccardarray && Graphiccardarray.map((Graphiccard, index) => (
                                            <MenuItem
                                                key={index}
                                                value={Graphiccard._id}
                                                sx={{
                                                    color: 'white',  // Ensures text is visible 
                                                    backgroundColor: "black", // Matches dropdown styling
                                                    "&:hover": { backgroundColor: "#333" } // Slight hover effect
                                                }}
                                            >
                                                {Graphiccard.graphiccardName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>)}
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
                                        value={age}
                                        onChange={handleChange}
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
                                        <MenuItem value="">
                                            <em style={{ color: "white" }}>None</em>
                                        </MenuItem>
                                        <MenuItem value={10} sx={{ color: "white" }}>Ten</MenuItem>
                                        <MenuItem value={20} sx={{ color: "white" }}>Twenty</MenuItem>
                                        <MenuItem value={30} sx={{ color: "white" }}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className={Style.infoicon}><InfoIcon /></div>
                            </div>
                        </div>
                    </div>)}
                    
                <div className={Style.button}>
                    
                {activeStep != 0 && (
                    <button className={Style.prevButton} onClick={handleBack}>Previous</button>)}
                  {activeStep != 7 && (  <button className={Style.nextButton} onClick={handleNext}>Next</button>)}
                  {activeStep === 7 && (  <button className={Style.nextButton} >Finish</button>)}
                </div>
            </div>
        </div>
    );
};

export default Advancelevel;
