import React from 'react';

import PageHeader from '../components/Page-Header/PageHeader';

import MovieGrid from '../components/Movie-Grid/MovieGrid';

const Catalog = () => {

    return (
        <>
            <PageHeader>
                Peliculas en cartelera
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid />
                </div>
            </div>
        </>
    );
}

export default Catalog;