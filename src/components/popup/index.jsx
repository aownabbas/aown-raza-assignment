import React from 'react'
import {
    Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight, CopyAll } from '@mui/icons-material';

function LinkPopup({ linkPopup, setLinkPopup, meetingLink }) {
    return (<Dialog open={linkPopup} onClose={() => setLinkPopup(false)}>
        <DialogTitle className='link-title'>Meeting Link</DialogTitle>
        <DialogContent>
            <Typography className='link-style'>{meetingLink}</Typography>
        </DialogContent>
        <DialogActions>
            <div className='btns-container '>
                <Button
                    startIcon={<CopyAll />}
                    onClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        alert('Link copied to clipboard');
                    }}
                >
                    Copy Link
                </Button>
                <Button color="error" onClick={() => setLinkPopup(false)}>
                    Close
                </Button>
            </div>
        </DialogActions>
    </Dialog>
    )
}

export default LinkPopup