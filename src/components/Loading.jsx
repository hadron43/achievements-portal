import React from 'react';

function Loading(props) {
    let size = (props.size) ? props.size : "fa-5x";
    let margin = (props.margin) ? props.margin : "my-5";
    return (
        <div className="w-100 d-flex">
            <i className={`fa fa-spinner fa-pulse fa-fw text-color-main w-100 ${size} ${margin}`}></i>
        </div>
    );
}

export default Loading;