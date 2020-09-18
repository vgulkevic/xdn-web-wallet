import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleInput from "./input/SimpleInput";

export const ConfirmationDialogWithTextInput = ({title, description, open, cancelCallback, applyCallback, confirmationRequired}) => {
    const [confirmationPrompt, setConfirmationPrompt] = useState("");
    const [showValidation, setShowValidation] = useState(false);

    const apply = () => {
        if ((confirmationPrompt || "").toLowerCase() === "continue" || !confirmationRequired) {
            applyCallback();
            onClose();
        } else {
            setShowValidation(true);
        }
    };

    const cancel = () => {
        cancelCallback();
        onClose();
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            apply();
        }
    };

    const onClose = () => {
        setShowValidation(false);
        setConfirmationPrompt("");
    };

    return (
        <>
            <div>
                <Dialog
                    open={open}
                    fullWidth={true}
                    maxWidth="sm"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    disableEscapeKeyDown={false}
                    onExit={onClose}
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        {description}
                        <br/>
                        {confirmationRequired &&
                        <>
                            <div style={{textAlign: 'center', textDecoration: `underline`, paddingTop: '15px'}}>To confirm, please type <b>continue</b> in the box below</div>
                            <SimpleInput
                                value={confirmationPrompt}
                                type={'text'}
                                error={showValidation}
                                setter={(val) => {
                                    setConfirmationPrompt(val);
                                    setShowValidation(false)
                                }}
                                onKeyDown={onKeyDown}
                                // helperText={isShowValidationError ? validationFailText : null}
                            />
                        </>
                        }
                    </DialogContent>
                    <DialogActions>
                        {confirmationRequired ?
                            <>
                                <Button onClick={() => cancel()} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={() => apply()} color="primary" autoFocus>
                                    Confirm
                                </Button>
                            </>
                            :
                            <>
                                <Button onClick={() => apply()} color="primary" autoFocus>
                                    Ok
                                </Button>
                            </>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}