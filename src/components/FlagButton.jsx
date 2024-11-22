import { useLanguageStore } from "../stores/useLanguageStore";
import Flag from "react-world-flags"; // Ensure this package is installed

export const FlagButton = () => {
  const { currentLanguage, toggleLanguage } = useLanguageStore();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-secondary max-w-[200px] ml-auto text-primary p-2 rounded shadow"
    >
      {currentLanguage === "en" ? (
        <Flag code="US" className="w-6 h-6" />
      ) : (
        <Flag code="SE" className="w-6 h-6" />
      )}
      <span className="text-sm font-medium">
        {currentLanguage === "en" ? "English" : "Svenska"}
      </span>
    </button>
  );
};
