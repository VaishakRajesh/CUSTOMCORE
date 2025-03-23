import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Style from './ViewUserDetails.module.css';

const ViewUserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animateCard, setAnimateCard] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/collectionUserById/${id}`);
                setUser(response.data.user);
                setLoading(false);
                // Trigger animation after data is loaded
                setTimeout(() => setAnimateCard(true), 100);
            } catch (err) {
                setError('Failed to fetch user details');
                setLoading(false);
                console.error('Error fetching user details:', err);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) return <div className={Style.loading}>Loading user details...</div>;
    if (error) return <div className={Style.error}>{error}</div>;
    if (!user) return <div className={Style.notFound}>User not found</div>;

    return (
        <div className={Style.userDetailsContainer}>
            <h1 className={Style.pageTitle}>User Details</h1>
            <div className={`${Style.userCard} ${animateCard ? Style.cardVisible : ''}`}>
                <div className={Style.userHeader}>
                    <div className={Style.userPhoto}>
                        <img src={user.userPhoto} alt={user.userName} />
                    </div>
                    <h2 className={Style.userName}>{user.userName}</h2>
                </div>
                
                <div className={Style.userInfo}>
                    <div className={`${Style.infoItem} ${Style.fadeIn}`} style={{animationDelay: '0.2s'}}>
                        <span className={Style.label}>Email:</span>
                        <span className={Style.value}>{user.userEmail}</span>
                    </div>
                    <div className={`${Style.infoItem} ${Style.fadeIn}`} style={{animationDelay: '0.4s'}}>
                        <span className={Style.label}>Address:</span>
                        <span className={Style.value}>{user.userAddress}</span>
                    </div>
                    <div className={`${Style.infoItem} ${Style.fadeIn}`} style={{animationDelay: '0.6s'}}>
                        <span className={Style.label}>Contact:</span>
                        <span className={Style.value}>{user.userContact}</span>
                    </div>
                    <div className={`${Style.infoItem} ${Style.fadeIn}`} style={{animationDelay: '0.8s'}}>
                        <span className={Style.label}>ID Proof:</span>
                        <div className={Style.proofImage}>
                            <img src={user.userProof} alt="ID Proof" />
                        </div>
                    </div>
                </div>
                
                <div className={Style.actions}>
                    <button className={Style.backButton} onClick={() => window.history.back()}>
                        Back to Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUserDetails;