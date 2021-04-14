import React from 'react';

function Loading(props) {
    let size = (props.size) ? props.size : "fa-5x";
    let margin = (props.margin) ? props.margin : "my-5";
    return (
        <div className="w-100 d-flex">
            <div className="d-flex m-auto">
                <i className={`fa fa-spinner fa-pulse fa-fw text-color-main ${size} ${margin}`}></i>
            </div>
        </div>
    );
}

export default Loading;