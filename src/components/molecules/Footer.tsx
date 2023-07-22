import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 text-center text-primary">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} HooBook. All rights reserved.</p>
        <p>Created with Redux by Hossain</p>
      </div>
    </footer>
  );
};

export default Footer;
