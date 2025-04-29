import { IMAGE_URL } from 'constants/comoon';
import { useCallback, useState } from 'react';
import TextAnimation from 'utils/scroll-text';
import { cn } from 'utils/styles';

function Concept() {
  const [sliderPosition, setSliderPosition] = useState(43);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) {
        return;
      }

      const sliderRect = event.currentTarget.getBoundingClientRect();

      setSliderPosition(Math.min(Math.max(((event.clientX - sliderRect.left) / sliderRect.width) * 100, 0), 100));
    },
    [isDragging]
  );

  return (
    <section className="bg-[#344859]" aria-labelledby="concept-title">
      <div className="container mx-auto flex flex-col gap-10 px-5 py-30 lg:gap-20">
        <div className="flex flex-col gap-6 items-center">
          <TextAnimation
            as="h2"
            text="One photo, infinite emotions"
            variants={{
              hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
              visible: {
                filter: 'blur(0px)',
                opacity: 1,
                y: 0,
                transition: { ease: 'linear' },
              },
            }}
            className="text-4xl font-extrabold text-center text-white"
          />
          <TextAnimation
            as="p"
            letterAnime={true}
            text="Upload your photo or write a diary and let AI turn them into a picture with various styles"
            className="text-xl w-full mx-auto lowercase leading-5 text-[#999999] text-center"
            variants={{
              hidden: { filter: 'blur(4px)', opacity: 0, y: 20 },
              visible: {
                filter: 'blur(0px)',
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.2,
                },
              },
            }}
          />
        </div>

        <div
          className={cn(
            'will-change-transform transform-style-preserve-3d z-10 bg-transparent bg-center',
            `bg-no-repeat bg-contain w-[398px] h-[768px] bg-[url(${IMAGE_URL}/iPhone_x_mockup.png)]`,
            'flex flex-col justify-center items-center mx-auto'
          )}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          role="slider"
          aria-valuenow={sliderPosition}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Image comparison slider"
        >
          <div className="z-20 bg-transparent w-90 h-182.5 block relative overflow-clip rounded-[40px]">
            <div className="will-change-opacity z-50 bg-transparent flex justify-center items-start px-2.5 absolute -top-[5px] left-0 right-0 overflow-hidden">
              <img
                className="will-change-transform transform-style-preserve-3d"
                src={`${IMAGE_URL}/iPhone_ui_notch_time.png`}
                alt="iPhone UI notch time"
              />
            </div>

            <div className="relative w-full h-full">
              <img
                className="w-full h-full block bg-white max-w-none object-cover"
                src={`${IMAGE_URL}/mock_detail_screen.png`}
                alt="Mock detail screen"
              />

              <div className="absolute top-21.5 left-5 right-5 w-[100%-20px] h-106 rounded-4xl overflow-clip">
                <div
                  className="h-full w-full absolute top-0 left-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    className="w-full h-full block bg-white max-w-none object-cover"
                    src={`${IMAGE_URL}/main_concept_picture.png`}
                    alt="Original picture"
                  />
                </div>

                <div className="absolute bottom-5 left-7 z-10 py-0.5 px-3 text-white text-xs font-medium bg-[#131E28] rounded-full opacity-40">
                  Before
                </div>
                <div className="absolute bottom-5 right-7 z-10 py-0.5 px-3 text-white text-xs font-medium bg-[#131E28] rounded-full opacity-40">
                  After
                </div>

                <img
                  className="w-full h-full block bg-white max-w-none object-cover"
                  src={`${IMAGE_URL}/main_concept_picture_with_ai.png`}
                  alt="Picture with AI styling"
                />
                <SliderOverlay sliderPosition={sliderPosition} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SliderOverlay = ({ sliderPosition }: { sliderPosition: number }) => {
  return (
    <div className="absolute w-full h-full top-0 z-10">
      <div
        className="absolute touch-none z-10 top-0 bottom-0 w-0.5 h-full bg-white cursor-grab outline-none"
        style={{
          left: `${sliderPosition}%`,
        }}
        role="presentation"
      >
        <span className="sliderImageBar_dividing_line__circle" aria-hidden="true">
          <div className="w-1.5 fill-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 20" aria-hidden="true">
              <path
                d="M9 2L2.4 8.6c-.8.8-.8 2 0 2.8L9 18"
                fill="none"
                stroke="#10A9FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <div className="w-1.5 fill-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 20" aria-hidden="true">
              <path
                d="M2 2l6.6 6.6c.8.8.8 2 0 2.8L2 18"
                fill="none"
                stroke="#10A9FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Concept;
