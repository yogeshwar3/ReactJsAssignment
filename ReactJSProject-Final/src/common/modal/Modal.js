import React, {useState} from 'react';
import {Tab, Tabs} from "@material-ui/core";
import ReactModal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const Modal = ({open, close, tabs, tabActions}) => {
    const [tab, setTab] = useState({value: 0, action: tabActions['Login']});

    const onTabChange = (event, value) => {
        setTab({value: value, action: tabActions[tabs[value]]});
    }

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={open}
            onRequestClose={close}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
                <Tabs
                    value={tab.value}
                    onChange={onTabChange}
                    indicatorColor="primary"
                    variant="fullWidth"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: 'red',
                        }
                    }}
                >
                    {tabs.map((tab, idx) => <Tab key={idx} label={tab} /> )}
                </Tabs>
                {tabActions[tabs[tab.value]]}
        </ReactModal>
    );
}

export default Modal;