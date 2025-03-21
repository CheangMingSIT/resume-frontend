import { VscSend } from "react-icons/vsc";

export default function Home() {
  return (
    <>
      <main className="flex flex-row min-h-screen">
        <div className="basis-1/4"></div>
        <div className="basis-1/2 flex flex-col">
          <h1 className="text-2xl dark:text-white font-sans text-center mt-4 mb-7 items-center">
            Chat
          </h1>

          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            <div className="ml-auto bg-indigo-600 rounded-2xl p-4 max-w-[75%] w-fit">
              <p className="dark:text-white text-xl antialiased">
                Hello there! How can I assist you today?
              </p>
            </div>

            {/* Long text div */}
            <div className="flex justify-start mt-10">
              {/* <p className="dark:text-white text-left text-xl antialiased max-w-prose">
                "Lorem ipsum quantum flux traverses the nebula horizon, while
                the kinetic vortex oscillates in ephemeral synergy. Placeholder
                data generates cascading elements, ensuring equilibrium in
                dynamic layouts. Anomaly detection in synthetic transactions
                validates resonance across the user interface. Temporal
                divergence creates a paradox of seamless navigation, enhancing
                the trajectory of interactive components. Radiance of luminous
                typography elevates readability, juxtaposed against dark mode
                adaptability. Benchmarking performance metrics in an agile
                environment fosters synthesis of optimal rendering strategies.
                Vector-based animations maintain fluid transitions, preserving
                momentum while avoiding entropy-induced lag. This test case
                ensures robustness against turbulence in varying screen
                resolutions, embodying a utopian approach to responsive design.
              </p> */}
              <div role="status" className="w-full animate-pulse">
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[50%]"></div>
              </div>
            </div>
          </div>

          <div className="mb-8 relative">
            <textarea
              className="w-full h-34 p-3 border border-stone-700 rounded-3xl dark:bg-stone-800 dark:text-white resize-none focus:outline-none focus:ring-0 focus:border-stone-700 text-xl"
              placeholder="Ask anything here..."
            />
            <button className="absolute bottom-4 right-3 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition">
              <VscSend className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="basis-1/4"></div>
      </main>
    </>
  );
}
