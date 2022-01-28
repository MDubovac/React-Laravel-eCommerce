import React from 'react';

import Header from './Header';

function MainPage(props) {

    let Cmp = props.Cmp;

    return (
        <>
            <Header />
            <main>
                <Cmp />
            </main>
        </>
    );
}

export default MainPage;
