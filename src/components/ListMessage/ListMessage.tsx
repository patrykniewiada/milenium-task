import React from 'react';

const ListMessage = ({msg}: { msg: string }) => {
    return (
        <div>
            <h2 data-testid="message">{msg}</h2>
        </div>
    );
};

export default ListMessage;