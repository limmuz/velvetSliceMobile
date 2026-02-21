export default function PalhetaDeCores({ className }: { className?: string }) {
  return (
    <div className={className || "h-[193px] relative w-[558px]"} data-name="palheta de cores">
      <div className="absolute bg-white inset-0 rounded-[50px]" />
      <div className="absolute inset-[5.18%_65.77%_6.74%_4.3%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 167 170">
          <ellipse cx="83.5" cy="85" fill="var(--fill-0, #4F2C1D)" id="Ellipse 12" rx="83.5" ry="85" />
        </svg>
      </div>
      <div className="absolute inset-[5.18%_50.54%_6.74%_19.53%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 167 170">
          <ellipse cx="83.5" cy="85" fill="var(--fill-0, #873B0B)" id="Ellipse 1" rx="83.5" ry="85" />
        </svg>
      </div>
      <div className="absolute inset-[5.18%_35.3%_6.74%_34.77%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 167 170">
          <ellipse cx="83.5" cy="85" fill="var(--fill-0, #A65110)" id="Ellipse 2" rx="83.5" ry="85" />
        </svg>
      </div>
      <div className="absolute bottom-[6.74%] left-1/2 right-[20.07%] top-[5.18%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 167 170">
          <g id="Ellipse 4">
            <ellipse cx="83.5" cy="85" fill="var(--fill-0, #E6642F)" rx="83.5" ry="85" />
            <ellipse cx="83.5" cy="85" fill="var(--fill-1, #E6642F)" rx="83.5" ry="85" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-[5.18%_4.84%_6.74%_65.23%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 167 170">
          <ellipse cx="83.5" cy="85" fill="var(--fill-0, #FFF6E9)" id="Ellipse 5" rx="83.5" ry="85" />
        </svg>
      </div>
    </div>
  );
}