import React, { useState } from 'react';
import { Recipe } from '../models/Recipe';
import {
    Typography,
    Slider,
    Mark,
    Grid,
    Card,
    CardContent,
    makeStyles,
    createStyles,
    Theme,
    LinearProgress,
    Stepper,
    Step,
    StepLabel,
    Box
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardLeft: {
            marginTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            marginRight: theme.spacing(1),
            height: '94%'
        },
        cardRight: {
            marginTop: theme.spacing(1),
            maringLeft: theme.spacing(1),
            height: '94%'
        },
        stepper: {
            marginTop: theme.spacing(1),
            borderRadius: 4
        }
    })
);
export interface BrewerProps {
    recipe: Recipe;
}

const initialPortions = 5;
const stepTime = 45;
const sound = new Audio('bell.mp3');
const finishTime = stepTime * initialPortions;

const Brewer: React.SFC<BrewerProps> = ({ recipe }) => {
    const [time, setTime] = useState(0);
    const [steps, setSteps] = useState(
        Array.from(new Array(initialPortions), (_, i) => (i === 0 ? (recipe.coffee * 2.5) / recipe.water : (i + 1) / initialPortions))
    );
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [finished, setFinished] = useState(false);

    const sortedSteps = steps.sort();
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
            clearInterval(timer as NodeJS.Timeout);
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

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography>Prepare {recipe.coffee.toFixed(1)} g of coffee and rinse your filter.</Typography>
            <Typography>Pour water in {new Set(steps).size} steps by:</Typography>
            <Box marginX={2}>
                <Slider
                    value={steps}
                    onChange={(_, values) => setSteps(values as number[])}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(step, index) => ((step - (index ? steps[index - 1] : 0)) * recipe.water).toFixed()}
                    aria-labelledby="range-slider"
                    max={1}
                    step={0.001}
                    marks={marks}
                />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">{!finished ? moment.unix(time).format('mm:ss') : 'Done!'}</Typography>
                <Button variant="contained" color="primary" onClick={toggleTimer}>
                    {!timer ? 'Start' : 'Pause'}
                </Button>
                <Button variant="contained" color="primary" onClick={resetTimer}>
                    Reset
                </Button>
            </Box>
            <LinearProgress className={classes.stepper} variant="determinate" value={(time / finishTime) * 100} color="primary" />
            <Stepper className={classes.stepper} activeStep={stepIndex} alternativeLabel>
                {marks.map((mark, index) => (
                    <Step key={index}>
                        <StepLabel>{mark.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container>
                <Grid item xs={6}>
                    <Card className={classes.cardLeft}>
                        <CardContent>
                            <Typography variant="h5">Step: {stepIndex + 1}</Typography>
                            <Typography variant="h5">Pour: {currentPortion} ml</Typography>
                            <Typography variant="h5">Total: {marks[stepIndex].label}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.cardRight}>
                        <CardContent>
                            <Typography variant="h5">
                                {isLastStep ? 'Done' : 'Next'} in: {moment.unix(stepTime - (time % stepTime)).format('mm:ss')}
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
