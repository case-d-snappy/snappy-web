function Loading() {
  return (
    <main className="bg-[#131e28]">
      <div className="flex justify-center gap-5 w-full h-screen flex-1 transform translate-y-1/2">
        <div className="w-4.5 h-4.5 bg-tertiary rounded-full inline-block animate-bounce1 bg-[#10A9FF]"></div>
        <div className="w-4.5 h-4.5 bg-tertiary rounded-full inline-block animate-bounce2 bg-[#10A9FF]"></div>
        <div className="w-4.5 h-4.5 bg-tertiary rounded-full inline-block animate-bounce3 bg-[#10A9FF]"></div>
      </div>
    </main>
  );
}

export default Loading;
