import React from "react";
import './loading.css'

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <div className="loading-spinner"></div>
        </div>
    )
}


export default Loading;