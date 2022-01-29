import React from 'react';

import './page-header.css';

import bg from '../../assets/footer-bg.jpg';

const PageHeader = () => {
    return (
        <div className="page-header" style={{backgroundImage: `url(${bg})`}}>
        </div>
    );
}


export default PageHeader;