import "./loading.css";

const Loading = () => {
  return (
    <div className="bg-black/50 backdrop-blur-md hue-rotate-30 w-full flex items-center justify-center h-screen fixed z-10 top-0 left-0 right-0 bottom-0">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
