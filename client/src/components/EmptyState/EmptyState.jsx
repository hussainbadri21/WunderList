import React from "react";
import empty_img from "../../assets/empty.svg";

const EmptyState = () => {
    return (
        <>
            <div className='f-d f-h-c f-v-c f-vt empty_state lr-pad-d lr-pad-m'>
                <div className='bg-image empty_img' style={{backgroundImage: `url(${empty_img})`}}/>
                <div className='body-regular'>Looks empty in here, click on the `+` button to add a task</div>
            </div>
            <style jsx={"true"}>
                {`
                  .empty_state {
                    height: 40rem;
                  }

                  .empty_state .empty_img {
                    width: 200px;
                    height: 200px;
                  }

                  .empty_state .body-regular {
                    margin-top: 2rem;
                  }
                `}
            </style>

        </>
    );
}

export default EmptyState;
