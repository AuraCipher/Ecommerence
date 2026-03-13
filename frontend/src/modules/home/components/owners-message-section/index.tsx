const OwnersMessageSection = () => {
  return (
    <section className="container mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
      <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
        <div className="relative">
          {/* Decorative Quote Mark - Improved positioning for mobile with larger size */}
          <div className="absolute -top-4 sm:-top-6 -left-2 sm:-left-4 md:-left-8 text-5xl sm:text-7xl md:text-9xl text-primary/20 font-serif leading-none">"</div>

          <div className="relative bg-white border border-black rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl sm:shadow-2xl md:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),0_10px_10px_-5px_rgba(0,0,0,0.03)] lg:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:shadow-2xl transition-shadow">
            <div className="space-y-4 sm:space-y-6">
              {/* Enhanced responsive typography with larger mobile sizes */}
              <h2 className="font-serif text-4xl sm:text-4xl md:text-5xl lg:text-5xl text-center mb-6 sm:mb-8">A Message from Our Founder</h2>
              
              <p className="text-xl sm:text-xl text-muted-foreground leading-relaxed">
                Welcome to DailyBudgetMart, where quality meets affordability. We believe that everyone deserves access to beautiful, well-crafted products without breaking the bank.
              </p>
              
              <p className="text-xl sm:text-xl text-muted-foreground leading-relaxed">
                Our journey started with a simple vision: to curate a collection of items that bring joy and value to your everyday life. Every product you find here has been carefully selected with you in mind.
              </p>
              
              <p className="text-xl sm:text-xl text-muted-foreground leading-relaxed">
                Thank you for being part of our story. Your trust means everything to us.
              </p>
              
              <div className="pt-4 sm:pt-6 border-t border-black mt-6 sm:mt-8 bg-white rounded-b-xl">
                <div className="p-4 sm:p-6 text-black">
                  <p className="font-serif text-2xl sm:text-2xl">With gratitude,</p>
                  <p className="text-3xl sm:text-3xl font-serif mt-1 sm:mt-2">The DailyBudgetMart Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OwnersMessageSection