import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleRetry = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <h2>{this.props.title || "Something went wrong"}</h2>

          <p>
            {this.props.message ||
              "This part of the application could not be displayed."}
          </p>

          <button onClick={this.handleRetry}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
