function Layout(props) {
  return (
    <div className="flex justify-center p-20">
	  <div className="max-w-150 w-150 bg-[#F2F1F1] rounded-xl p-5 space-y-10">
	    {/* O props.children é uma espécie de $slot para que todo o conteúdo dentro da tag venha para aqui */}
		{props.children}
	  </div>
    </div>
  );
}

export default Layout;
