import React, { useState } from 'react';
import { Recipe } from '../models/Recipe';
import { Typography, Slider, Grid, Card, CardContent, LinearProgress, Stepper, Step, StepLabel, Box, Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { formatTime } from '../utils/formatTime';

const styles = {
    cardLeft: {
        mt: 1,
        pb: 1,
        mr: 1,
        height: '94%'
    },
    cardRight: {
        mt: 1,
        ml: 1,
        height: '94%'
    },
    stepper: {
        mt: 1,
        borderRadius: '4px'
    }
} satisfies Record<string, SxProps<Theme>>;

interface Mark {
    value: number;
    label: string;
}

export interface BrewerProps {
    recipe: Recipe;
}

const initialPortions = 5;
const stepTime = 45;
const sound = new Audio(`${import.meta.env.BASE_URL}bell.mp3`);
const finishTime = stepTime * initialPortions;

const Brewer: React.FC<BrewerProps> = ({ recipe }) => {
    const [time, setTime] = useState(0);
    const [steps, setSteps] = useState(
        Array.from(new Array(initialPortions), (_, i) => (i === 0 ? (recipe.coffee * 2.5) / recipe.water : (i + 1) / initialPortions))
    );
    const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();
    const [finished, setFinished] = useState(false);

    const sortedSteps = [...steps].sort((a, b) => a - b);
    const sortedWaterSteps = sortedSteps.map(s => Math.round((s * recipe.water) / 5) * 5);
    const marks: Mark[] = sortedSteps.map(s => ({
        value: s,
        label: `${Math.round((s * recipe.water) / 5) * 5} ml`
    }));

    const startTimer = () => {
        setTimer(getTimer());
        setFinished(false);
    };

    const getTimer = () =>
        setInterval(() => {
            setTime(time => {
                //TODO: Fix empty steps issue
                if (time + 1 < finishTime) {
                    if ((time + 1) % stepTime === 0) sound.play();
                    return time + 1;
                } else {
                    sound.play();
                    killTimer();
                    setFinished(true);
                    return 0;
                }
            });
        }, 1000);

    const killTimer = () => {
        setTimer(timer => {
            clearInterval(timer);
            return undefined;
        });
    };

    const toggleTimer = () => (!timer ? startTimer() : killTimer());

    const resetTimer = () => {
        if (timer) killTimer();
        setTime(0);
        setFinished(false);
    };

    const stepIndex = Math.floor(time / stepTime);
    
    const isLastStep = stepIndex + 1 === sortedSteps.length;
   
    const currentPortion = sortedWaterSteps[stepIndex] - (stepIndex === 0 ? 0 : sortedWaterSteps[stepIndex - 1]);
    const nextPortion    = sortedWaterSteps[stepIndex + 1] - sortedWaterSteps[stepIndex];

    return (
        <React.Fragment>
            <Typography>Prepare {recipe.coffee.toFixed(1)} g of coffee and rinse your filter.</Typography>
            <Typography>Pour water in {new Set(steps).size} steps by:</Typography>
            <Box sx={{ mx: 2 }}>
                <Slider
                    value={sortedSteps}
                    onChange={(_, values) => setSteps(values as number[])}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(step, index) => ((step - (index ? sortedSteps[index - 1] : 0)) * recipe.water).toFixed()}
                    aria-labelledby="range-slider"
                    max={1}
                    step={0.001}
                    marks={marks}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">{!finished ? formatTime(time) : 'Done!'}</Typography>
                <Button variant="contained" color="primary" onClick={toggleTimer}>
                    {!timer ? 'Start' : 'Pause'}
                </Button>
                <Button variant="contained" color="primary" onClick={resetTimer}>
                    Reset
                </Button>
            </Box>
            <LinearProgress sx={styles.stepper} variant="determinate" value={(time / finishTime) * 100} color="primary" />
            <Stepper sx={styles.stepper} activeStep={stepIndex} alternativeLabel>
                {marks.map((mark, index) => (
                    <Step key={index}>
                        <StepLabel>{mark.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container>
                <Grid size={6}>
                    <Card sx={styles.cardLeft}>
                        <CardContent>
                            <Typography variant="h5">Step: {stepIndex + 1}</Typography>
                            <Typography variant="h5">Pour: {currentPortion} ml</Typography>
                            <Typography variant="h5">Total: {marks[stepIndex].label}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={6}>
                    <Card sx={styles.cardRight}>
                        <CardContent>
                            <Typography variant="h5">
                                {isLastStep ? 'Done' : 'Next'} in: {formatTime(stepTime - (time % stepTime))}
                            </Typography>
                            {!isLastStep && (
                                <React.Fragment>
                                    <Typography variant="h5">Pour: {nextPortion} ml</Typography>
                                    <Typography variant="h5">Total: {marks[stepIndex + 1].label}</Typography>
                                </React.Fragment>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Brewer;
