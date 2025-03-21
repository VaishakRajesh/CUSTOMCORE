import React, { useEffect, useState } from 'react';
import Style from './PcBuliderSelect.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PcBuliderSelect = () => {
    const [place, setPlace] = useState('');
    const [district, setDistrict] = useState('');
    const [placeArray, setPlaceArray] = useState([]);
    const [districtArray, setDistrictArray] = useState([]);
    const [pcBuilders, setPcBuilders] = useState([]); // State to store PC builders
    const [loading, setLoading] = useState(false); // State to handle loading state

    // Fetch places and districts on component mount
    useEffect(() => {
        fetchDistrict();
    }, []);

    // Fetch places based on district
    const fetchPlace = async (districtId) => {
        try {
            const response = await axios.get(`http://localhost:5000/collectionPlaceByIdAll/${districtId}`);
            setPlaceArray(response.data);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    // Fetch districts from the API
    const fetchDistrict = async () => {
        try {
            const response = await axios.get('http://localhost:5000/collectionDistrict');
            setDistrictArray(response.data.district);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    // Handle district selection
    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        setDistrict(selectedDistrictId);
        setPlace(''); // Reset place when district changes
        fetchPlace(selectedDistrictId); // Fetch places for the selected district
    };

    // Handle place selection
    const handlePlaceChange = (e) => {
    };

    // Handle search for PC builders
    const handleSearch = async (id) => {
        setPlace(id);



        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/collectionPcBuliderByIdAll/${id}`);
            console.log(response);

            setPcBuilders(response.data.pcBulider); // Assuming the API returns an array of PC builders
        } catch (error) {
            console.error('Error fetching PC builders:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Style.container}>
            <h1 className={Style.title}>Select PC Builder</h1>
            <div className={Style.form}>
                {/* District Dropdown */}
                <label htmlFor="district" className={Style.label}>District:</label>
                <select id="district" value={district} onChange={handleDistrictChange} className={Style.select}>
                    <option value="">Select District</option>
                    {districtArray.map((district, index) => (
                        <option key={index} value={district._id}>
                            {district.districtName}
                        </option>
                    ))}
                </select>

                {/* Place Dropdown */}
                <label htmlFor="place" className={Style.label}>Place:</label>
                <select id="place" value={place} onChange={(e) => handleSearch(e.target.value)} className={Style.select} disabled={!district}>
                    <option value="">Select Place</option>
                    {placeArray.map((place, index) => (
                        <option key={index} value={place._id}>
                            {place.placeName}
                        </option>
                    ))}
                </select>

                {/* Search Button */}

            </div>

            {/* Display PC Builders */}
            {pcBuilders.length > 0 && (
                <div className={Style.results}>
                    <h2>PC Builders</h2>
                    {pcBuilders.map((builder) => (
                        <div key={builder._id} className={Style.builderCard}>
                            <div className={Style.builderImageContainer}>
                                <img src={builder.pcBuliderPhoto} alt={builder.pcBuliderName} className={Style.builderImage} />
                            </div>
                            <div className={Style.builderDetails}>
                                <h3>{builder.pcBuliderName}</h3>
                                <p><strong>Address:</strong> {builder.pcBuliderAddress}</p>
                                <p><strong>Contact:</strong> {builder.pcBuliderContact}</p>
                                <p><strong>Email:</strong> {builder.pcBuliderEmail}</p>
                                <Link to={`/User/Advancelevel/${builder._id}`}><button className={Style.selectButton}>Select</button>              </Link>
                        </div>
            </div>
            ))}
        </div>
    )
}

{/* No Results Message */ }
{
    pcBuilders.length === 0 && !loading && (
        <p className={Style.noResults}>No PC builders found for the selected district and place.</p>
    )
}
    </div >
  );
};

export default PcBuliderSelect;