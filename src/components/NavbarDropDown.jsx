import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function NavbarDropdown({
  options,
  defaultValue,
  label,
  onChange,
}) {
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", close);

    return () => {
      document.removeEventListener("pointerdown", close);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-sm !text-[#222] hover:!text-[#9747FF]"
      >
        <span>{selected}</span>

        <ChevronDown
          size={16}
          strokeWidth={1.8}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`
          absolute right-0 top-full z-50 mt-3
          w-[220px]
          rounded-lg border border-[#eeeeee]
          bg-white p-4
          shadow-[0_4px_20px_rgba(0,0,0,0.12)]
          transition-all duration-200
          ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible pointer-events-none -translate-y-2 opacity-0"
          }
        `}
      >
        <p className="mb-3 text-sm font-medium text-[#222]">
          {label}
        </p>

        <div className="flex flex-col">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setSelected(option.value);
                setIsOpen(false);
                onChange?.(option.value);
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-2 py-2 text-sm text-[#222] transition-colors hover:bg-[#f5f5f5]"
            >
              <span>{option.name}</span>
              <span>{option.symbol}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}