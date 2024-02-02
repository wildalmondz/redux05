import React, { useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    height: '15em',
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Recaptcha = () => {
    const captchaRef = useRef(null);

    const resetCaptcha = () => {
        setTimeout(() => {
            if (captchaRef.current) {
                captchaRef.current.reset();
            }
        }, 60000);
    };

    const onChange = (value) => {
        console.log("Captcha value:", value);
        resetCaptcha();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Get the captcha value
        const captchaValue = captchaRef.current?.getValue();

        // Check if captcha value exists
        if (captchaValue) {
            // Perform your logic with the captcha value
            console.log("Submitting with captcha value:", captchaValue);
        } else {
            // Display an error to the user that the recaptcha box must be checked
            console.error("Captcha validation failed. Please check the recaptcha box.");
        }
    };

    return (
            <Grid item xs={8} sm={6} sx={{ height: 25, width: 99 }}>
                <Item>
                    <div className="captcha" style={{ transform: "scale(0.73)", transformOrigin: "0 0" }}>
                        <ReCAPTCHA
                            ref={captchaRef}
                            size="compact" // Set the size to compact
                            sitekey="6LcUOEAaAAAAAB7egsJshmpS-P92-xI62GTKJz9X"
                            onChange={onChange}
                        />
                    </div>
                </Item>
                <Grid item xs={8}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Send
                    </Button>
                </Grid>
            </Grid>
    );
};

export default Recaptcha;
