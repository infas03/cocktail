import Link from 'next/link';

const Header = () => {
  return (
    <header className="h-16 bg-yellow-500 w-full mx-auto max-w-[1200px] min-w-[320px] flex items-center justify-between">
      <div>Cocktail</div>
      <nav>
        {/* You can add links here if needed */}
      </nav>
    </header>
  );
};

export default Header;
