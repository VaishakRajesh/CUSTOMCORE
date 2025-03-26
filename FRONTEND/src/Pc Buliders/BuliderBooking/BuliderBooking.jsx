import React, { useState, useEffect } from 'react';
import styles from './BuliderBooking.module.css';
import axios from 'axios';
const BuilderBooking = () => {
  const [customBuilds, setCustomBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuild, setSelectedBuild] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    fetchGPU();
    fetchRAM();
    fetchStorage();
    fetchSMPS();
    fetchCase();
    fetchCooler();
    fetchMotherboard();
    fetchCPU();
    // Get builder ID from session storage
    const builderId = sessionStorage.getItem('pid');
    if (builderId) {
      fetchBuilderCustomBuilds(builderId);
    } else {
      setLoading(false);
      alert('Builder ID not found. Please login again.');
    }
  }, []);

  const fetchBuilderCustomBuilds = async (builderId) => {
    try {
      // Fetch only the builds assigned to this specific builder
      const response = await fetch(`http://localhost:5000/collectionCustomByBuilder/${builderId}`);
      if (response.ok) {
        const data = await response.json();
        setCustomBuilds(data);
      } else {
        console.error('Failed to fetch custom builds');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching custom builds:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    setStatusUpdate(e.target.value);
  };

  const handleBuildSelect = (build) => {
    setSelectedBuild(build);
    setStatusUpdate(build.customStatus || '');
  };

  const updateBuildStatus = async (e) => {
    e.preventDefault();
    
    if (!selectedBuild || !statusUpdate) return;
    
    try {
      // Update the status of the selected build
      const response = await fetch(`/updateCustomStatus/${selectedBuild._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customStatus: statusUpdate
        }),
      });
      
      if (response.ok) {
        alert('Build status updated successfully!');
        
        // Update the build in our local state
        const updatedBuilds = customBuilds.map(build => 
          build._id === selectedBuild._id 
            ? {...build, customStatus: statusUpdate} 
            : build
        );
        
        setCustomBuilds(updatedBuilds);
        setSelectedBuild({...selectedBuild, customStatus: statusUpdate});
      } else {
        alert('Failed to update build status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating build status:', error);
      alert('An error occurred. Please try again later.');
    }
  };


    const [cpuarray, setcpuarray] = useState([]);
    const [Graphiccardarray, setGraphiccardarray] = useState([]);
    const [RAMarray, setRAMarray] = useState([]);
    const [Storagearray, setStoragearray] = useState([]);
    const [SMPSarray, setSMPSarray] = useState([]);
    const [Casearray, setCasearray] = useState([]);
    const [Coolerarray, setCoolerarray] = useState([]);
    const [Motherboardarray, setMotherboardarray] = useState([]);

  const fetchCPU = () => {
          axios.get("http://localhost:5000/collectionCpuById/")
              .then((response) => setcpuarray(response.data.cpu))
              .catch((err) => console.log(err));
      };
      const fetchGPU = () => {
          axios.get("http://localhost:5000/collectionGraphiccardById")
              .then((response) => setGraphiccardarray(response.data.graphiccard))
              .catch((err) => console.log(err));
      };
  
      const fetchRAM = () => {
          axios.get("http://localhost:5000/collectionRamById/")
              .then((response) => setRAMarray(response.data.ram))
              .catch((err) => console.log(err));
      };
  
      const fetchStorage = () => {
          axios.get("http://localhost:5000/collectionStorageById/")
              .then((response) => setStoragearray(response.data.storage))
              .catch((err) => console.log(err));
      };
  
      const fetchSMPS = () => {
          axios.get("http://localhost:5000/collectionSmpsById/")
              .then((response) => setSMPSarray(response.data.smps))
              .catch((err) => console.log(err));
      };
  
      const fetchCase = () => {
          axios.get("http://localhost:5000/collectionCaseById/")
              .then((response) => setCasearray(response.data.cases))
              .catch((err) => console.log(err));
      };
  
      const fetchCooler = () => {
          axios.get("http://localhost:5000/collectionCoolerById/")
              .then((response) => setCoolerarray(response.data.cooler))
              .catch((err) => console.log(err));
      };
  
      const fetchMotherboard = () => {
        axios.get(`http://localhost:5000/collectionMotherboardById/`)
            .then((response) => setMotherboardarray(response.data.motherboard))
            .catch((err) => console.log(err));
            console.log(Motherboardarray);
            
    };


  // Function to fetch component details from IDs
  const fetchComponentDetails = async (build) => {
    if (!build) return;
    
    try {
      // Get details for the motherboard
      const mbResponse = await fetch(`http://localhost:5000/collectionMotherboardById/${build.motherboardId}`);
      const motherboard = await mbResponse.json();
      
      // Get details for other components similarly
      // This is just an example - you would implement similar fetches for each component
      
      // Update the selected build with component details
      setSelectedBuild({
        ...selectedBuild,
        motherboardDetails: motherboard,
        // Other component details would be added here
      });
    } catch (error) {
      console.error('Error fetching component details:', error);
    }
  };

  return (
    <div className={styles.builderBookingContainer}>
      <h1 className={styles.mainTitle}>PC Builder Dashboard</h1>
      
      {loading ? (
        <div className={styles.loading}>Loading custom builds...</div>
      ) : (
        <div className={styles.content}>
          <div className={styles.buildSelection}>
            <h2>Your Assigned Custom Builds</h2>
            {customBuilds.length === 0 ? (
              <div className={styles.noBuildMessage}>
                No custom builds assigned to you yet.
              </div>
            ) : (
              <div className={styles.buildsList}>
                {customBuilds.map(build => (
                  <div 
                    key={build._id} 
                    className={`${styles.buildCard} ${selectedBuild?._id === build._id ? styles.selected : ''}`}
                    onClick={() => handleBuildSelect(build)}
                  >
                    <h3>Custom Build #{build._id.slice(-4)}</h3>
                    <div className={styles.buildDetails}>
                      <p><strong>Status:</strong> {build.customStatus || 'Not Started'}</p>
                      <div className={styles.statusIndicator} 
                        data-status={build.customStatus || 'pending'}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className={styles.buildDetails}>
            {selectedBuild ? (
              <>
                <h2>Build Details</h2>
                <div className={styles.detailsCard}>
                  <h3>Components</h3>
                  <div className={styles.componentsList}>
                    <div className={styles.component}>
                      <span className={styles.componentLabel}>Motherboard ID:</span>
                      <span className={styles.componentValue}>{Motherboardarray.motherboardName}</span>
                    </div>
                    <div className={styles.component}>
                      <span className={styles.componentLabel}>Storage ID:</span>
                      <span className={styles.componentValue}>{selectedBuild.storageId}</span>
                    </div>
                    <div className={styles.component}>
                      <span className={styles.componentLabel}>RAM ID:</span>
                      <span className={styles.componentValue}>{selectedBuild.ramId}</span>
                    </div>
                    <div className={styles.component}>
                      <span className={styles.componentLabel}>Graphics Card ID:</span>
                      <span className={styles.componentValue}>{selectedBuild.graphiccardId}</span>
                    </div>
                    <div className={styles.component}>
                      <span className={styles.componentLabel}>Cooler ID:</span>
                      <span className={styles.componentValue}>{selectedBuild.coolerId}</span>
                    </div>
                    <div className={styles.component}>
                      <span className={styles.componentLabel}>Case ID:</span>
                      <span className={styles.componentValue}>{selectedBuild.CaseId}</span>
                    </div>
                  </div>
                  
                  <button 
                    className={styles.detailsBtn}
                    onClick={() => fetchComponentDetails(selectedBuild)}
                  >
                    Fetch Detailed Component Info
                  </button>
                  
                  <div className={styles.statusUpdateForm}>
                    <h3>Update Build Status</h3>
                    <form onSubmit={updateBuildStatus}>
                      <div className={styles.formGroup}>
                        <label htmlFor="status">Status</label>
                        <select
                          id="status"
                          value={statusUpdate}
                          onChange={handleStatusChange}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Parts Ordered">Parts Ordered</option>
                          <option value="Assembly Started">Assembly Started</option>
                          <option value="Testing">Testing</option>
                          <option value="Completed">Completed</option>
                          <option value="Ready for Pickup">Ready for Pickup</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                      
                      <button 
                        type="submit" 
                        className={styles.submitBtn}
                      >
                        Update Status
                      </button>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.selectBuildPrompt}>
                Select a custom build from the list to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderBooking;