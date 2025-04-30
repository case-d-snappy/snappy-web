import TextAnimation from 'utils/ScrollText';

function GetStarted() {
  return (
    <section className="container mx-auto flex flex-col items-center gap-10 px-5 py-30">
      <TextAnimation
        as="h2"
        text="Start your moment with Snappy"
        variants={{
          hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
          visible: {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            transition: { ease: 'linear' },
          },
        }}
        className="text-4xl font-extrabold text-[#F0EDE5] text-center"
      />
      <TextAnimation
        as="p"
        letterAnime={true}
        text="Preorder Snappy now to get early access and enjoy exclusive discounts just for you!"
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
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-[#070e41] hover:bg-[#FF2768] px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl duration-300">
          Get Started Now!
        </span>
      </button>
    </section>
  );
}

export default GetStarted;
