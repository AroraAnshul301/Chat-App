const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 min-h-screen">
      <div className="max-w-md text-center">
        {/* Grid of animated tiles */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl transition-transform duration-300 bg-gradient-to-br from-primary/10 to-primary/20 hover:scale-105 ${
                i % 2 === 0
                  ? "animate-pulse shadow-md shadow-primary/20"
                  : "bg-primary/5"
              }`}
            />
          ))}
        </div>

        {/* Title and subtitle */}
        <h2 className="text-3xl font-bold text-base-content mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-base text-base-content/70 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
