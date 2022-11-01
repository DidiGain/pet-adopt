import { Link } from 'react-router-dom';
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error Boundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          Oops! An error ocuur :( <Link to="/">Click here</Link> to get back to
          the home page.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
