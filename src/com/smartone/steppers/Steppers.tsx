/**
* com/smartone/steppers/Steppers
**/
import React from 'react';
import styled from 'styled-components';
import { Step, Stepper, StepLabel, StepIconProps, StepConnector, Theme } from '@material-ui/core';
import { Check } from '@styled-icons/material';

//
const QontoConnector = styled(StepConnector)(() => ({
    '&.MuiStepConnector-alternativeLabel': {
        left: 'calc(-50% + 15px)',
        right: 'calc(50% + 15px)',
    },
    '&.MuiStepConnector-active': {
        '& .MuiStepConnector-line': {
            borderColor: '#ff0000',
        },
    },
    '&.MuiStepConnector-completed': {
        '& .MuiStepConnector-line': {
            borderColor: '#ff0000',
        },
    },
    '& .MuiStepConnector-line': {
        borderColor: '#D3D3D3',
        borderTopWidth: 2,
        borderRadius: 1,
    }
}));


const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean, completed?: boolean } }>(
    ({ ownerState }) => ({
        boxSizing: 'border-box',
        color: '#9C9C9C',
        display: 'flex',
        width: 30,
        height: 30,
        justifyContent: 'center',
        borderRadius: '100%',
        border: '2px solid #cbcccd',
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#fff',
            background: '#ff0000',
            border: 'none',
        }),
        ...(ownerState.completed && {
            color: '#fff',
            background: '#ff0000',
            border: 'none',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#fff',
            zIndex: 1,
            fontSize: 18,
						'& > path[d]': {
							transform: 'scale(0.7)',
							transformOrigin: 'center center'
						}
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);
const StyledStepLabel = styled(StepLabel)`
    & .MuiStepLabel-label.MuiStepLabel-alternativeLabel{
        font-size: 1.2rem;
        color: #9C9C9C;
        margin-top:${props => (props.theme as Theme).spacing(1)}px;
        font-weight: 300; 
        ${(p) => p.theme.breakpoints.up('md')} {
            margin-top:${props => (props.theme as Theme).spacing(1)}px;
            font-size: 1.4rem;
        }
    },
    & .MuiStepLabel-label.MuiStepLabel-alternativeLabel, 
    .MuiStepLabel-label.MuiStepLabel-active{
        color: rgb(156, 156, 156);   
        font-weight: 300; 
    }
`;
const StyledStepper = styled(Stepper)`
    &.MuiStepper-root {
        padding: ${props => (props.theme as Theme).spacing(3)}px 0 0 0;
        box-sizing: border-box;
    }
    &.MuiPaper-root {
        background-color: initial;
    }
`;
//
function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active, completed }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                    <div className="QontoStepIcon-circle" />
                )}
        </QontoStepIconRoot>
    );
}

//
export interface SteppersProps {
    activeStep: number;
    steps: string[];
}

export function Steppers({ activeStep = 0, steps }: SteppersProps) {
    return (
        <StyledStepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
            {steps.map((label) => (
                <Step key={label}>
                    <StyledStepLabel StepIconComponent={QontoStepIcon}>{label}</StyledStepLabel>
                </Step>
            ))}
        </StyledStepper>
    );
}
export default Steppers;