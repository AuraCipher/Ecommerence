const ValuesSection = () => {
  const values = [
    {
      icon: "✓",
      title: "Quality First",
      description: "Every product is carefully selected and tested to meet our high standards"
    },
    {
      icon: "✦",
      title: "Accessible Luxury",
      description: "Premium aesthetics and quality without the premium price tag"
    },
    {
      icon: "♦",
      title: "Sustainable Choice",
      description: "Committed to responsible sourcing and eco-friendly practices"
    }
  ]

  return (
    <section className="bg-muted/50 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              {/* Enhanced icon container with improved shadows and hover effects */}
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <span className="text-2xl">{value.icon}</span>
              </div>
              {/* Improved typography hierarchy */}
              <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">{value.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection