"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface Option {
    value: string;
    label: string;
    disabled?: boolean;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

export default function CustomSelect({
    options,
    value,
    onChange,
    placeholder = "-",
}: CustomSelectProps) {
    const selectedValue =
        options.find((opt) => opt.value === value)?.value || "";

    return (
        <div className="relative w-full">
            <Listbox value={selectedValue} onChange={onChange}>
                {({ open }) => (
                    <Listbox.Button
                        className="
            flex w-full cursor-pointer items-center justify-between 
            rounded-xl border px-4 py-2 text-left transition 
            border-[var(--accent)] bg-[var(--accent)] 
            text-[var(--input-text)] dark:text-[var(--text)]
            focus:outline-none 
          "
                    >
                        {options.find((opt) => opt.value === value)?.label ||
                            placeholder}
                        <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                        <Listbox.Options
                            className="
            absolute top-full left-0 w-full mt-1 max-h-60 overflow-auto 
            rounded-xl shadow-lg bg-[var(--menu-bg)] z-2
          "
                        >
                            {options.map((opt) => (
                                <Listbox.Option
                                    key={opt.value}
                                    value={opt.value}
                                    disabled={opt.disabled}
                                >
                                    {({ active, selected }) => (
                                        <div
                                            className={`
                    cursor-pointer px-4 py-2 transition z-50
                    ${active ? "bg-[var(--accent)] text-[var(--text)]" : ""}
                    ${selected ? "font-semibold" : ""}
                    ${opt.disabled ? "cursor-not-allowed opacity-50" : ""}
                  `}
                                        >
                                            {opt.label}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox.Button>
                )}
            </Listbox>
        </div>
    );
}
