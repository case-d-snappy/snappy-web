function Loading() {
  return (
    <div className="flex justify-center gap-5 w-full flex-1 transform translate-y-1/2">
      <div className="w-4.5 h-4.5 bg-tertiary rounded-full inline-block animate-bounce1"></div>
      <div className="w-4.5 h-4.5 bg-tertiary rounded-full inline-block animate-bounce2"></div>
      <div className="w-4.5 h-4.5 bg-tertiary rounded-full inline-block animate-bounce3"></div>
    </div>
  );
}

export default Loading;
