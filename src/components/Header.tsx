import ChevronDown from 'assets/svgs/chevron_down.svg';
import SnappyLogo from 'assets/svgs/snappy.svg';
import { LanguageCode } from 'constants/common';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const languageOptions = [
  { value: LanguageCode.EN, label: 'English' },
  { value: LanguageCode.KO, label: '한국어' },
];

function Header() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: (typeof LanguageCode)[keyof typeof LanguageCode]) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-[#131e28]">
      <div className="container mx-auto flex items-center justify-between w-full h-full">
        <div className="flex items-center">
          {/* @ts-expect-error */}
          <SnappyLogo height={56} width="100%" />
        </div>
        <div className="relative">
          <button
            type="button"
            className="flex items-center px-3 py-2 text-white bg-transparent rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {languageOptions.find(option => option.value === i18n.language)?.label}
            {/* @ts-expect-error */}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? '-rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-full bg-gray-800 rounded-md shadow-lg py-1 z-10">
              {languageOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left "
                  onClick={() => handleLanguageChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
