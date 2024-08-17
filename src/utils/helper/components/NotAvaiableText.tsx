import React from "react";

const NotAvailableText = ({ className = "" }: { className?: string }) => {
  return <span className={"text-gray-300 italic " + className}>N/A</span>;
};

export default NotAvailableText;
