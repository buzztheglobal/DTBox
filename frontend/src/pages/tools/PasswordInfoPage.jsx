// src/pages/tools/PasswordInfoPage.jsx
import React from 'react';
import TipsSection from '../../components/password-generator/TipsSection';
import ExamplesSection from '../../components/password-generator/ExamplesSection';
import NotesSection from '../../components/password-generator/NotesSection';
import PasswordGenerator from '../../components/password-generator/PasswordGenerator';
import AccordionSection from '../../components/password-generator/AccordionSection';
import '../../components/password-generator/password_info.css';
import { Container } from '@mui/material';
import { pageContainerStyle } from '../../styles/globalStyles'; // ✅ correct

const PasswordInfoPage = () => (
  <Container maxWidth="md" sx={pageContainerStyle}>
    <PasswordGenerator />
    <AccordionSection title="Tips for Strong Passwords">
      <TipsSection />
    </AccordionSection>
    <AccordionSection title="Example Passwords">
      <ExamplesSection />
    </AccordionSection>
    <AccordionSection title="Additional Notes">
      <NotesSection />
    </AccordionSection>
  </Container>
);

export default PasswordInfoPage;
