import React, { useState } from 'react';
import { Recipe } from '../models/Recipe';
import { Typography, Slider, Mark } from '@material-ui/core';
// import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import moment from 'moment';

export interface BrewerProps {
    recipe: Recipe;
}

const initialPortions = 5;
const stepTime = 45;
const sound = new Audio('bell.mp3');

const Brewer: React.SFC<BrewerProps> = ({ recipe }) => {
    const [time, setTime] = useState(0);
    const [steps, setSteps] = useState(Array.from(new Array(initialPortions), (_, i) => (i + 1) / initialPortions));
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    const sortedSteps = steps.sort();
    const marks: Mark[] = sortedSteps.map(s => ({
        value: s,
        label: `${(s * recipe.water).toFixed()} ml`
    }));

    const startTimer = () => setTimer(getTimer());
    const getTimer = () =>
        setInterval(() => {
            setTime(time => {
                //TODO: Fix empty steps issue
                const finishTime = stepTime * initialPortions;

                if (time + 1 < finishTime) {
                    if (time !== 0 && time % stepTime === 0) sound.play();
                    return time + 1;
                } else {
                    sound.play();
                    killTimer();
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

    const stepIndex = Math.floor(time / stepTime);

    const currentStep = sortedSteps[stepIndex];
    const previousStep = stepIndex ? sortedSteps[stepIndex - 1] : 0;
    const currentPortion = ((currentStep - previousStep) * recipe.water).toFixed();

    return (
        <React.Fragment>
            <Typography>Prepare {recipe.coffee.toFixed(1)} g of coffee</Typography>
            <Typography>Pour in {new Set(steps).size} steps by:</Typography>
            {/* <LinearProgress variant="determinate" value={progress} color="primary" /> */}
            {/* TODO: Show label with current step amount */}

            <Slider
                value={steps}
                valueLabelFormat={value => (value * recipe.water).toFixed()}
                onChange={(_, values) => setSteps(values as number[])}
                aria-labelledby="range-slider"
                max={1}
                step={0.001}
                marks={marks}
            />
            {/* TODO: Center button */}
            <Button variant="contained" color="primary" onClick={() => (!timer ? startTimer() : killTimer())}>
                {!timer ? 'Start' : 'Pause'}
            </Button>
            <Typography variant="h2">{moment.unix(time).format('mm:ss')}</Typography>
            <Typography variant="h4">Step {stepIndex + 1}</Typography>
            <Typography variant="h4">Pour {currentPortion} ml of water</Typography>
            <Typography variant="h4">Total {marks[stepIndex].label} of water</Typography>
        </React.Fragment>
    );
};

export default Brewer;
