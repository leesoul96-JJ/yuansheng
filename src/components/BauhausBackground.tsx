export default function BauhausBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(196, 155, 60, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 155, 60, 0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Bauhaus geometric decorations */}
      {/* Large circle top right */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-gold/5" />
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-teal/5" />

      {/* Rectangle bottom left */}
      <div className="absolute bottom-40 -left-20 w-80 h-80 border border-teal/5 -rotate-12" />

      {/* Small circles */}
      <div className="absolute top-1/3 left-[12%] w-3 h-3 rounded-full bg-gold/10" />
      <div className="absolute top-2/3 right-[15%] w-2 h-2 rounded-full bg-teal/15" />

      {/* Lines */}
      <div className="absolute top-[60%] left-[5%] w-20 h-px bg-gold/10 rotate-45" />
      <div className="absolute top-[30%] right-[8%] w-16 h-px bg-teal/10 -rotate-12" />

      {/* Bauhaus corner bracket top left */}
      <div className="absolute top-20 left-8 opacity-20">
        <div className="w-12 h-px bg-gold" />
        <div className="w-px h-12 bg-gold ml-0" />
      </div>

      {/* Corner bracket bottom right */}
      <div className="absolute bottom-20 right-8 opacity-20">
        <div className="w-12 h-px bg-gold ml-auto" />
        <div className="w-px h-12 bg-gold ml-auto" />
      </div>
    </div>
  );
}