import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import styled from 'styled-components';

interface SimpleAccordionProps {
    title?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
		defaultSummaryStyle?: boolean;
    className?: string;
		toggleHandler?: (e: React.ChangeEvent, expand: boolean) => void;
}
const StyledTypographyHeader = styled(Typography)`
    color: ${p => p.theme.palette.text.secondary};
`
const styles = {
	root: {
		justifyContent: 'flex-start'
	},
	content: {
		width: '90%',
	}
}

const StyledAccordionSummary = withStyles(styles)(AccordionSummary);

const DetailAccordion = ({ title = "", children, defaultOpen = false, className = '', toggleHandler = () => {}, defaultSummaryStyle = true }: SimpleAccordionProps) => {
    return (

            <div className={className}>
                <Accordion defaultExpanded={defaultOpen} square={true} elevation={0}  onChange={toggleHandler}>
										{ defaultSummaryStyle ? 
											<AccordionSummary
											aria-controls="panel1a-content"
											id="panel1a-header"
											>
													<StyledTypographyHeader variant="body1">{title}</StyledTypographyHeader>
											</AccordionSummary>
											: <StyledAccordionSummary
											aria-controls="panel1a-content"
											id="panel1a-header"
											>
													<StyledTypographyHeader variant="body1">{title}</StyledTypographyHeader>
											</StyledAccordionSummary>
										}
                    <AccordionDetails>
                        {children}
                    </AccordionDetails>
                </Accordion>
            </div>

    );
}

export default DetailAccordion;
