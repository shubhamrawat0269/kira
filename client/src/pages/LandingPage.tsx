import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="">
      {/* Hero Section */}
      <div className="text-center mt-20 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Manage Projects Like a Pro
        </h2>

        <p className="text-gray-600 mb-6">
          Collaborate, assign tasks, and track progress with ease.
        </p>

        <Button size="lg" onClick={() => navigate("/signup")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}