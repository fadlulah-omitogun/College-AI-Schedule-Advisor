import { useNavigate } from "react-router-dom";
import StudentImage from "./assets/student.png";
import EducationalIcons from "./assets/educational-icons.webp";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      {/* Top half with image */}
      <div className="relative h-1/2">
        <img
          src={StudentImage}
          alt="Student"
          className="w-full h-full object-cover"
        />

        {/* Responsive gradient overlay */}
        <div
          className="absolute inset-0 rounded-t-lg hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, rgba(13, 27, 42, 0.85), rgba(27, 38, 59, 0.7), rgba(65, 90, 119, 0.5), rgba(119, 141, 169, 0.3), rgba(224, 225, 221, 0))",
          }}
        ></div>
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13, 27, 42, 0.85), rgba(27, 38, 59, 0.7), rgba(65, 90, 119, 0.5), rgba(119, 141, 169, 0.3), rgba(224, 225, 221, 0))",
          }}
        ></div>

        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
          <div className="text-3xl md:text-4xl font-extrabold text-white text-center max-w-2xl">
            The path to your academic success starts here!
          </div>
          <button
            onClick={() => navigate("/form")}
            className="px-8 py-4 text-xl font-semibold text-white bg-[#168AAD] rounded-lg hover:bg-[#1E6091] shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Bottom half */}
      <div
        className="relative h-1/2 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${EducationalIcons})`,
        }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-80"></div>

        {/* Text container */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 gap-2">
          <h1 className="text-4xl font-bold text-gray-900 my-12">
            Welcome to Your College Roadmap Advisor!
          </h1>
        </div>
      </div>

      <div
        className="w-full py-16 px-8"
        style={{
          background:
            "linear-gradient(to right, #03045e, #023e8a, #0077b6, #0096c7, #00b4d8, #48cae4)",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for Smarter Scheduling
          </h2>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Our AI-driven platform helps you organize your classes, manage your
            time, and optimize your schedule with ease. From personalized
            recommendations to conflict-free planning, we’ve got you covered.
          </p>
        </div>
      </div>
    </div>
  );
}
