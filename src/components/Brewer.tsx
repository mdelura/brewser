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
    StepLabel
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            '& > * > *': {
                // margin: theme.spacing(1)
            }
        },
        cardLeft: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        cardRight: {
            marginTop: theme.spacing(1),
            maringLeft: theme.spacing(1)
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
    const [steps, setSteps] = useState(Array.from(new Array(initialPortions), (_, i) => (i + 1) / initialPortions));
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [finished, setFinished] = useState(false);

    const sortedSteps = steps.sort();
    const marks: Mark[] = sortedSteps.map(s => ({
        value: s,
        label: `${(s * recipe.water).toFixed()} ml`
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

    const currentStep = sortedSteps[stepIndex];
    const previousStep = stepIndex ? sortedSteps[stepIndex - 1] : 0;
    const isLastStep = stepIndex + 1 === sortedSteps.length;
    const nextStep = !isLastStep ? sortedSteps[stepIndex + 1] : currentStep;
    const currentPortion = ((currentStep - previousStep) * recipe.water).toFixed();
    const nextPortion = ((nextStep - currentStep) * recipe.water).toFixed();

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography>Prepare {recipe.coffee.toFixed(1)} g of coffee. Remember to rinse your filter!</Typography>
            <Typography>Pour water in {new Set(steps).size} steps by:</Typography>
            {/* TODO: Show label with current step amount */}
            <Slider
                value={steps}
                onChange={(_, values) => setSteps(values as number[])}
                aria-labelledby="range-slider"
                max={1}
                step={0.001}
                marks={marks}
            />
            {/* TODO: Center button */}
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h4">
                        {moment.unix(time).format('mm:ss')} {finished && 'Done!'}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={toggleTimer}>
                        {!timer ? 'Start' : 'Pause'}
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={resetTimer}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
            <LinearProgress className={classes.stepper} variant="determinate" value={(time / finishTime) * 100} color="primary" />
            <Stepper className={classes.stepper} activeStep={stepIndex} alternativeLabel>
                {marks.map((mark, index) => (
                    <Step key={index}>
                        <StepLabel>{mark.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container className={classes.container}>
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
                            <Typography variant="h5">Next in: {moment.unix(stepTime - (time % stepTime)).format('mm:ss')}</Typography>
                            <Typography variant="h5">{!isLastStep ? `Pour: ${nextPortion} ml` : 'Done!'}</Typography>
                            <Typography variant="h5">{!isLastStep ? `Total: ${marks[stepIndex + 1].label}` : ''}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Brewer;
