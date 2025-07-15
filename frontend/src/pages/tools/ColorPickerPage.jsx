import React, { Component } from 'react';
import { Container, Box } from '@mui/material';
import ColorPickerPanel from '../../components/color_picker/ColorPickerPanel';

// ErrorBoundary component to catch and handle errors
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again or refresh the page.</h1>;
    }
    return this.props.children;
  }
}

const ColorPickerPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <ErrorBoundary>
          <ColorPickerPanel />
        </ErrorBoundary>
      </Box>
    </Container>
  );
};

export default ColorPickerPage;