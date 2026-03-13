import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero-luxury.jpg"
          alt="Luxury products showcase - Premium quality everyday essentials"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="max-w-xl">
          <p className="text-luxury-label mb-4">Spring Collection 2025</p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-white">
            Premium Quality,<br />Everyday Prices
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            Discover curated essentials that blend luxury aesthetics with accessible pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <LocalizedClientLink href="/store">
              <button className="btn-luxury">
                Shop Collection
              </button>
            </LocalizedClientLink>
            <button className="btn-luxury-outline">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
