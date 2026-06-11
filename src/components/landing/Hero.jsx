import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl opacity-40" />

      <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary rounded-full blur-3xl opacity-20" />

      <div className="max-w-350 mx-auto px-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-sm font-medium">
            🌿 Your Safe Space For Mental Wellness
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold leading-tight">
            Your Journey To
            <span className="block bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Better Mental Wellness
            </span>
            Starts Here.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Track your emotions, reflect through journaling, chat with Maya AI,
            connect with counselors and access support whenever you need it.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-2xl bg-primary text-white shadow-md">
              Get Started
            </button>

            <button className="px-6 py-3 rounded-2xl border">Learn More</button>
          </div>

          <div className="mt-10 flex gap-8">
            <div>
              <h3 className="text-2xl font-bold">24/7</h3>
              <p className="text-muted-foreground">AI Support</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">100%</h3>
              <p className="text-muted-foreground">Private</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">∞</h3>
              <p className="text-muted-foreground">Growth</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative hidden lg:flex justify-center">
          {/* Main Mood Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 w-95 border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Today&apos;s Mood</h3>

              <span className="text-2xl">😊</span>
            </div>

            <p className="text-muted-foreground mt-2">
              Feeling Calm & Positive
            </p>

            <div className="mt-6">
              <div className="flex items-end gap-2 h-24">
                <div className="w-5 bg-primary rounded-full h-10"></div>
                <div className="w-5 bg-primary rounded-full h-14"></div>
                <div className="w-5 bg-primary rounded-full h-20"></div>
                <div className="w-5 bg-primary rounded-full h-16"></div>
                <div className="w-5 bg-primary rounded-full h-24"></div>
                <div className="w-5 bg-primary rounded-full h-20"></div>
                <div className="w-5 bg-primary rounded-full h-24"></div>
              </div>
            </div>
          </div>

          {/* Maya Card */}
          <div className="absolute -right-16 top-10 bg-white rounded-2xl shadow-lg p-4 w-52 border">
            <div className="flex items-center gap-2">
              <span className="text-xl">💜</span>

              <span className="font-medium">Maya AI</span>
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              How are you feeling today?
            </p>
          </div>

          {/* Journal Card */}
          <div className="absolute -left-10 bottom-10 bg-white rounded-2xl shadow-lg p-4 w-60 border">
            <div className="flex items-center gap-2">
              <span>📖</span>

              <span className="font-medium">Journal Entry</span>
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              Today I felt more productive and focused than yesterday.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
