import ChevronLeft from 'assets/svgs/chevron_left.svg';
import ChevronRight from 'assets/svgs/chevron_right.svg';
import { IMAGE_URL, LanguageCode } from 'constants/common';
import { useInView } from 'framer-motion';
import { useViewEvent } from 'hooks/useViewEvent';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { analyticsEvent } from 'utils/analytics';
import TextAnimation from 'utils/ScrollText';
import { cn } from 'utils/styles';

function Concept() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, {
    once: true,
  });

  const [sliderPosition, setSliderPosition] = useState(43);
  const [isDragging, setIsDragging] = useState(false);

  const calculateSliderPosition = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const sliderRect = event.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    return Math.min(Math.max(((clientX - sliderRect.left) / sliderRect.width) * 100, 0), 100);
  };

  const handleSliderClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      setSliderPosition(calculateSliderPosition(event));
    },
    []
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (isDragging) {
        setSliderPosition(calculateSliderPosition(event));
      }
    },
    [isDragging]
  );

  useViewEvent(() => analyticsEvent.viewSection('concept'), inView);

  return (
    <section ref={containerRef} className="bg-[#344859]" aria-labelledby="concept-title">
      <div className="container mx-auto flex flex-col gap-10 px-5 py-30 lg:gap-20">
        <div className="flex flex-col gap-6 items-center">
          <TextAnimation
            as="h2"
            text={t('concept.title')}
            variants={{
              hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
              visible: {
                filter: 'blur(0px)',
                opacity: 1,
                y: 0,
                transition: { ease: 'linear' },
              },
            }}
            className="text-4xl font-extrabold text-center text-white uppercase"
          />
          <TextAnimation
            as="p"
            letterAnime={true}
            text={t('concept.description')}
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

        <div className="flex justify-center">
          <div
            className={cn(
              'bg-transparent bg-center bg-no-repeat bg-contain',
              'absolute will-change-transform transform-style-preserve-3d z-10 w-69 h-134.5',
              'md:w-99.5 md:h-192',
              'flex flex-col justify-center items-center mx-auto'
            )}
            style={{
              backgroundImage: `url(${IMAGE_URL}/iPhone_x_mockup.png)`,
            }}
          />

          <div
            className={cn(
              'z-20 bg-transparent w-63 h-128 block relative overflow-clip rounded-4xl top-3 md:top-4.5',
              'md:w-90 md:h-182.5 md:rounded-[40px]'
            )}
          >
            <div className="will-change-opacity z-50 bg-transparent flex justify-center items-start px-2.5 absolute top-0 md:-top-[5px] left-0 right-0 overflow-hidden">
              <img
                className="will-change-transform transform-style-preserve-3d"
                src={`${IMAGE_URL}/iPhone_ui_notch_time.png`}
                alt="iPhone UI notch time"
              />
            </div>

            <div className="relative w-full h-full">
              <img
                className="w-full h-full block bg-white max-w-none object-cover"
                src={`${IMAGE_URL}/${i18n.language.split('-')[0] ?? LanguageCode.EN}/mock_detail_screen.png`}
                alt="Mock detail screen"
              />

              <div
                role="slider"
                aria-valuenow={sliderPosition}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Image comparison slider"
                onClick={handleSliderClick}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleMouseMove}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className={cn(
                  'absolute top-19.5 left-3 right-3 w-[100%-20px] h-75 rounded-[29px] overflow-clip',
                  'md:top-27.5 md:left-5 md:right-5 md:h-106.5 '
                )}
              >
                <div
                  className="h-full w-full absolute top-0 left-0 overflow-hidden z-10"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    className="w-full h-full block bg-white max-w-none"
                    src={`${IMAGE_URL}/main_concept_picture.png`}
                    alt="Original picture"
                  />
                  <div
                    className={cn(
                      'absolute bottom-4 left-5 py-0.5 px-3 text-white text-xs font-medium bg-[#131E28] rounded-full opacity-40',
                      'md:bottom-5 md:left-7'
                    )}
                  >
                    Before
                  </div>
                </div>

                <img
                  className="w-full h-full block bg-white max-w-none"
                  src={`${IMAGE_URL}/main_concept_picture_with_ai.png`}
                  alt="Picture with AI styling"
                />
                <div
                  className={cn(
                    'absolute bottom-4 right-5 py-0.5 px-3 text-white text-xs font-medium bg-[#131E28] rounded-full opacity-40',
                    'md:bottom-5 md:right-7'
                  )}
                >
                  After
                </div>

                <SliderOverlay sliderPosition={sliderPosition} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SliderOverlayProps {
  sliderPosition: number;
}

const SliderOverlay = ({ sliderPosition }: SliderOverlayProps) => {
  return (
    <div className="absolute w-full h-full top-0 z-10 cursor-pointer">
      <div
        className="absolute touch-none z-10 top-0 bottom-0 w-0.5 h-full bg-white outline-none cursor-grab"
        style={{
          left: `${sliderPosition}%`,
        }}
        role="presentation"
      >
        <span className="sliderImageBar_dividing_line__circle" aria-hidden="true">
          <div className="w-1.5 fill-none text-[#10A9FF]">
            <ChevronLeft />
          </div>
          <div className="w-1.5 fill-none text-[#10A9FF]">
            <ChevronRight />
          </div>
        </span>
      </div>
    </div>
  );
};

export default Concept;
