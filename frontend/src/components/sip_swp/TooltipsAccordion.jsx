// Filename: src/components/sip_swp/TooltipsAccordion.jsx
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TooltipsAccordion = () => {
  const items = [
    { title: 'What is SIP?', content: 'Systematic Investment Plan allows you to invest a fixed amount regularly in a mutual fund.' },
    { title: 'What is SWP?', content: 'Systematic Withdrawal Plan lets you withdraw fixed amounts from your investments at intervals.' },
    { title: 'Why adjust for inflation?', content: 'Inflation reduces the real value of your returns, so adjusting gives a more accurate future value.' },
    { title: 'What is Step-Up SIP?', content: 'You can increase your SIP yearly to match your income growth, boosting returns.' }
  ];

  return (
    <>
      {items.map((item, idx) => (
        <Accordion key={idx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default TooltipsAccordion;
