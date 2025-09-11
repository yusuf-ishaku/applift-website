const features = [
  "Discovery & UX Research",
  "Product Architecture",
  "Agile Development",
  "QA & Post-Launch Support",
];

const WhyApplift = () => {
  return (
    <>
      <div className="mt-[80.5px]">
        <div className="flex flex-col items-center gap-[48px]">
          <div className="flex flex-col items-center gap-[32px]">
            <h3 className="box-border flex items-center justify-center py-[16px] px-[33px] gap-[10px] bg-[#00060A] rounded-[30px] font-medium text-[20px] leading-[25px] text-center text-[#B3D1E9]">
              Why Applift
            </h3>
            <div className="flex flex-col items-center gap-[24px] max-w-[881px]">
              <h4 className="font-medium text-[40px] leading-[50px] text-center">
                <span className="text-[#9AC1E1]">Building better</span>, not
                just faster.
              </h4>
              <p className="text-[18px] leading-[23px] text-center text-[#E6E6E6]">
                We don’t just code. We listen. We audit. We research. We build
                things with soul and solid systems. From first sketch to final
                launch, our work is guided by care and clarity.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-1 items-center w-full">
            {features.map((feat, index) => (
              <div
                key={feat}
                className="box-border h-full [background:linear-gradient(270deg,rgba(0,11,20,0.2)_0%,rgba(1,73,132,0)_100%)] rounded-[10px] py-[16px] pl-[16px] border-2 border-solid [border-image-source:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)]"
              >
                <div className="flex flex-col items-start gap-[64px] max-w-[213px] min-h-[130px]">
                  <div className="flex flex-col items-center justify-center p-[10px] gap-[10px] bg-[#67A2D3] rounded-[15px]">
                    <span className="font-medium text-[18px] leading-[23px] text-[#012D51]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-[18px] leading-[23px] text-white">
                    {feat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyApplift;
