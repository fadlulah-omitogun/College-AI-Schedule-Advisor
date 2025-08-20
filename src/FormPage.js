export default function FormPage() {
  return (
    <div
      className="min-h-screen w-full px-6 py-12 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to right, #0d1b2a, #1b263b, #415a77, #778da9, #e0e1dd)",
      }}
    >
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-[#023e8a] mb-10 text-center">
          Student Program Setup
        </h1>

        <form className="space-y-12">
          {/* Section 1 */}
          <section className="bg-white shadow-md rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-[#03045e] mb-6">
              1. Identity & Program Setup
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-[#00b4d8]"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Student ID <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="1234567"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-[#00b4d8]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-medium mb-2">University Name</label>
              <input
                type="text"
                placeholder="University of Example"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-[#00b4d8]"
              />
            </div>

            <div className="mt-6">
              <label className="block font-medium mb-2">
                Current Program/Major
              </label>
              <input
                type="text"
                placeholder="Computer Science"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-[#00b4d8]"
              />
            </div>

            <div className="mt-6">
              <label className="block font-medium mb-2">
                Minors/Concentrations
              </label>
              <input
                type="text"
                placeholder="Mathematics"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-[#00b4d8]"
              />
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">
                  Intended Graduation Date
                </label>
                <input
                  type="month"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-[#00b4d8]"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Degree Requirements File
                </label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white shadow-md rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-[#03045e] mb-6">
              2. Academic Record
            </h2>

            <div className="mt-6">
              <label className="block font-medium mb-2">
                Transcript Upload
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="mt-6">
              <label className="block font-medium mb-2">
                Advanced Placement / Transfer Credit Info
              </label>
              <textarea
                placeholder="List AP or transfer credits..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-[#00b4d8]"
                rows="3"
              ></textarea>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">
                  Current GPA <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  placeholder="3.85"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-[#00b4d8]"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Prerequisites Completed
                </label>
                <input
                  type="text"
                  placeholder="Auto-detected..."
                  disabled
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#03045e] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#023e8a] transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
