import { motion } from 'framer-motion';
import TextAnimation from 'utils/scroll-text';
import { cn } from 'utils/styles';

const Strengths = () => {
  return (
    <section className="bg-[#344859] ">
      <div className="container mx-auto flex flex-col gap-40 px-5 py-30">
        <div className="flex flex-col gap-6 items-center">
          <TextAnimation
            as="h2"
            text="Record precious moments specially and check them at a glance."
            variants={{
              hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
              visible: {
                filter: 'blur(0px)',
                opacity: 1,
                y: 0,
                transition: { ease: 'linear' },
              },
            }}
            className="text-4xl font-extrabold text-center"
          />
          <TextAnimation
            as="p"
            letterAnime={true}
            text="Record your precious daily moments with AI styling, and check your diary and photos at a glance."
            className="text-xl w-3/5 mx-auto lowercase leading-5 text-[#999999] text-center"
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
            'w-full h-full max-w-screen-2xl mx-auto flex flex-col gap-20 items-center justify-between',
            'lg:flex-row lg:gap-10'
          )}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 items-center lg:items-start"
          >
            <h3 className="text-5xl font-extrabold text-[#F0EDE5] text-center lg:text-left">
              Make your memories shine brighter
              <br />
              with AI-powered photo styling
            </h3>
            <h4 className="text-2xl text-[#999999] text-center lg:text-left">
              Capture the moment you want to remember, choose a style, and let AI make it special.
            </h4>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full xs:w-auto xs:max-h-[858px]"
            src="https://static.snappy.style/images/mock_day_card.png"
            alt="Day Card"
          />
        </div>

        <div
          className={cn(
            'w-full h-full max-w-screen-2xl mx-auto flex flex-col gap-20 items-center justify-between',
            'lg:flex-row-reverse lg:gap-10'
          )}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 items-center lg:items-start"
          >
            <h3 className="text-5xl font-extrabold text-[#F0EDE5] text-center lg:text-left">
              Write it down,
              <br />
              Snappy's AI turn them into a beautiful picture diary
            </h3>
            <h4 className="text-2xl text-[#999999] text-center lg:text-left">
              Write your daily diary and emotions, and AI will create a picture diary for you.
            </h4>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full xs:w-auto xs:max-h-[858px]"
            src="https://static.snappy.style/images/mock_detail_card.png"
            alt="Detail Card"
          />
        </div>

        <div
          className={cn(
            'w-full h-full max-w-screen-2xl mx-auto flex flex-col gap-20 items-center justify-between',
            'lg:flex-row lg:gap-10'
          )}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 items-center lg:items-start"
          >
            <h3 className="text-5xl font-extrabold text-[#F0EDE5] text-center lg:text-left">
              See all your days at a glance
            </h3>
            <h4 className="text-2xl text-[#999999] text-center lg:text-left">
              View all your days in one place, displayed in card or calendar format.
            </h4>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full xs:w-auto xs:max-h-[858px]"
            src="https://static.snappy.style/images/mock_calender_screen.png"
            alt="Calender Screen"
          />
        </div>
      </div>
    </section>
  );
};

export default Strengths;
