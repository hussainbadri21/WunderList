import React from "react";
import loading_gif from '../../assets/loading.gif';

const Spinner = () => {
    return (
        <>
            <div className="loading-container f-d f-v-c f-h-c lr-pad-d lr-pad-m tb-pad-d">
                <div className="loading-gif bg-image" style={{backgroundImage: 'url(' + loading_gif + ')'}}></div>
            </div>

            <style jsx={'true'}>
                {`
                  .loading-gif {
                    width: 240px;
                    height: 240px;
                  }
                `}
            </style>
        </>
    );
};

export default Spinner;
