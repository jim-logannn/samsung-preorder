import React, { useRef, useLayoutEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { findElementOffsetTop, windowScrollTo } from '../../util/WindowUtils';

interface SimpleAccordionProps {
    title?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
    order?: number;
    activeOrder?: number;
    onClick: (e:number)=>void;
}
const StyledTypographyHeader = styled(Typography)`
    color: ${p => p.theme.palette.text.primary};
`

const MobileAccordion = ({ title = "", children, defaultOpen = false, className = '', order=0, activeOrder=0, onClick}: SimpleAccordionProps) => {  
    const [expanded, setExpanded] = React.useState<number | false>(false);
    const myRef = useRef<HTMLDivElement>(null);
    
    const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {        
        setExpanded(isExpanded ? panel : false);
        //console.log("00 expanded|"+expanded);
    };

    /*
    useLayoutEffect(() => {
        if (myRef && myRef.current!=null && expanded >=0 ) {
            const offsetTop = findElementOffsetTop(myRef.current as HTMLElement);		
            console.log("11 expanded|"+expanded);
            console.log("offsetTop|"+offsetTop);
            //windowScrollTo(offsetTop)
            myRef.current.scrollIntoView({ behavior: 'smooth',block: "start", inline: "start" })
		}
	}, [expanded])
    */

    return (

        <div className={className}>
            <Accordion defaultExpanded={false} square={true} elevation={0} expanded={order === activeOrder} ref={myRef} onChange={handleChange(order)}>                            
                <AccordionSummary
                    aria-controls={"panel1a-content"+order}
                    id={"panel1a-header"+order}
                    onClick={()=>onClick(order)} >
                    <StyledTypographyHeader variant="body1">{title}</StyledTypographyHeader>
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default MobileAccordion;
