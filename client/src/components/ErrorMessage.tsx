interface ErrorMessageProps {
  message: string;
  className?: string;
}

function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div className={`bg-red-600 text-white p-3 rounded mb-4 ${className}`}>
      {message}
    </div>
  );
}

export default ErrorMessage;