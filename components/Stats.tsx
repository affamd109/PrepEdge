export default function Stats() {
    return (

         <section className="w-full bg-muted/25  py-12 md:py-24 opacity-90  " >

        <div className=" container mx-auto px-4 md:px-6" >

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto" >

            <div className="flex flex-col items-center justify-center gap-2" >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2db0e0] to-[#014a64] bg-clip-text text-transparent " >10k+</h1>
              <p className="text-muted-foreground" >Students impacted</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2" >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2db0e0] to-[#014a64] bg-clip-text text-transparent " >50+</h1>
              <p className="text-muted-foreground" >Industries covered</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2" >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2db0e0] to-[#014a64] bg-clip-text text-transparent " >95%</h1>
              <p className="text-muted-foreground" >Growth Rate</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2" >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2db0e0] to-[#014a64] bg-clip-text text-transparent " >24/7</h1>
              <p className="text-muted-foreground" >AI Support</p>
            </div>

          </div>

        </div>
      </section>
      
    )
}