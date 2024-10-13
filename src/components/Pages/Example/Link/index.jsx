// Example.js
import React from "react";
import { Link } from "@/components/Atoms";

const LinkExample = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Example Links</h2>
            <ul className="mt-4 space-y-2">
                <li>
                    <Link to="https://www.google.com" target="_blank">
                        Visit Google
                    </Link>
                </li>
                <li>
                    <Link to="https://www.facebook.com" target="_blank">
                        Visit Facebook
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="text-red-600">
                        About Us
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="text-green-600">
                        Contact
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default LinkExample;
