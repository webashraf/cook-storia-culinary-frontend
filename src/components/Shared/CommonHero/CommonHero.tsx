const CommonHero = ({ title = "", subtitle = "" }: any) => {
  return (
    <div
      className="h-64 bg-cover bg-center mb-8 "
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/close-up-street-food-neon-light_23-2151571689.jpg?t=st=1727716661~exp=1727720261~hmac=636ca02240fdbda111d3648e055e4e69175c31643c102ab03d7170f90c21423d&w=1380')",
      }}
    >
      <div className="bg-black/30 backdrop-blur-sm h-full w-full flex justify-center items-center">
        {" "}
        <h2 className="text-5xl text-center uppercase font-mono">{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default CommonHero;
