import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <p className="site-footer__copyright">
          © 2026 Saratoga Wilton Soccer Stats Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
